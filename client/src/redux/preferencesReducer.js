const SET_POSSIBLE_GROUPS = "SET-POSSIBLE-GROUPS";
const INIT_PREFERENCES_DATA = "INIT-PREFERENCES-DATA";
const PATCH_PREFERENCES_DATA = "PATCH-PREFERENCES-DATA";
const PATCH_DISCRET_COEF = "PATCH-DISCRETE-COEF";
const PATCH_CONTINUOUS_SPREAD = "PATCH-CONTINUOUS-SPREAD";
const LOAD_PREFERENCES_DATA = "LOAD-PREFERENCES-DATA";

const initialState = {
    demo: true,
    groups: [],
    preferencesData: {},
    preferencesTree: {},
}

const validatePreferenceDataKeys = (group, id, state, requiredType = "any") => {
    if (!state.groups.includes(group)) throw new Error(`Unexpected group ${group} in preferences patch`);

    if (!state.preferencesData[group].hasOwnProperty(id)) {
        throw new Error(`Property with id ${id} not found. In prefrences patch.`);
    }

    if (requiredType === "any") return;

    if (state.preferencesData[group][id].type != requiredType) {
        throw new Error(`Not ${requiredType} property can't be patched.`);
    }
}

const preferencesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSSIBLE_GROUPS: {
            return {
                ...state,
                groups: action.groups,
            };
        }

        case INIT_PREFERENCES_DATA: {
            let preferencesTree = {};
            for (let group in action.preferencesData) {
                preferencesTree[group] = {};

                for (let id in action.preferencesData[group]) {
                    preferencesTree[group][id] = {
                        sex: action.preferencesData[group][id].sex,
                        type: action.preferencesData[group][id].type
                    };
                }
            }

            return {
                ...state,
                preferencesData: action.preferencesData,
                preferencesTree: preferencesTree,
            };
        }

        case LOAD_PREFERENCES_DATA: {
            let newPreferencesData = JSON.parse(JSON.stringify(state.preferencesData));

            for (let i of action.loadData) {
                let preferenceData = newPreferencesData[i.group][i.id];
                preferenceData.positiveScale = i.positiveScale;
                preferenceData.negativeScale = i.negativeScale;
                preferenceData.otherNegative = i.otherNegative;
                if (i.prefType === "discret") preferenceData.columnCoefs = i.columnCoefs;
                if (i.prefType === "continuous") preferenceData.spreadPoints = i.spreadPoints;
            }

            return {
                ...state,
                preferenceData: newPreferencesData,
            };
        }

        case PATCH_DISCRET_COEF: {
            validatePreferenceDataKeys(action.group, action.id, state, "discrete");

            let newCoefs = [...state.preferencesData[action.group][action.id].columnCoefs];
            newCoefs[action.col] = action.newValue;

            return {
                ...state,
                preferencesData: {
                    ...state.preferencesData,
                    [action.group]: {
                        ...state.preferencesData[action.group],
                        [action.id]: {
                            ...state.preferencesData[action.group][action.id],
                            columnCoefs: newCoefs,
                        },
                    }
                }
            };
        }

        case PATCH_CONTINUOUS_SPREAD: {
            validatePreferenceDataKeys(action.group, action.id, state, "continuous");

            let spreadNew = [...state.preferencesData[action.group][action.id].spreadPoints];
            spreadNew[action.x] = action.y;
            
            return {
                ...state,
                preferencesData: {
                    ...state.preferencesData,
                    [action.group]: {
                        ...state.preferencesData[action.group],
                        [action.id]: {
                            ...state.preferencesData[action.group][action.id],
                            spreadPoints: spreadNew,
                        },
                    }
                }
            };
        }
        
        case PATCH_PREFERENCES_DATA: {
            validatePreferenceDataKeys(action.group, action.id, state);

            return {
                ...state,
                preferencesData: {
                    ...state.preferencesData,
                    [action.group]: {
                        ...state.preferencesData[action.group],
                        [action.id]: {
                            ...state.preferencesData[action.group][action.id],
                            ...action.newData
                        },
                    }
                }
            };
        }
    
        default:
            return state;
    }
}

export const createPreferencesData = propertiesData => {
    let res = {};
    for (let i of propertiesData.globalParams.groups) res[i] = {};

    for (let i of propertiesData.properties) {
        let preferenceData = {
            name: i.name,
            sex: i.sex,
            type: i.type,

            positiveScale: 1.0,
            negativeScale: 1.0,
            otherNegative: false,
        }

        switch (i.type) {
            case "discrete":
                preferenceData.variants = i.variants;
                preferenceData.columnCoefs = i.variants.map(e => 0.5);
                break;
            case "continuous":
                preferenceData.labels = i.labels;
                preferenceData.spreadPoints = new Array(propertiesData.globalParams.segmentsInPartion).fill(0);
        }

        res[i.group][i.id] = preferenceData;
    }

    return res;
};

export const setPossibleGroups = groups => ({type: SET_POSSIBLE_GROUPS, groups});
export const initPreferencesData = preferencesData => ({type: INIT_PREFERENCES_DATA, preferencesData});
export const loadPreferencesData = loadData => ({type: LOAD_PREFERENCES_DATA, loadData});
export const patchPreferencesData = (group, id, newData) => ({type: PATCH_PREFERENCES_DATA, group, id, newData});
export const patchDiscretCoef = (group, id, col, newValue) => ({type: PATCH_DISCRET_COEF, group, id, col, newValue});
export const patchContinuousSpread = (group, id, x, y) => ({type: PATCH_CONTINUOUS_SPREAD, group, id, x, y})

export default preferencesReducer;
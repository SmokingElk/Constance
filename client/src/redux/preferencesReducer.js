const SET_POSSIBLE_GROUPS = "SET-POSSIBLE-GROUPS";
const INIT_PREFERENCES_DATA = "INIT-PREFERENCES-DATA";
const PATCH_PREFERENCES_DATA = "PATCH-PREFERENCES-DATA";

const initialState = {
    groups: [],
    preferencesData: {},
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
            return {
                ...state,
                preferencesData: action.preferencesData,
            };
        }
        
        case PATCH_PREFERENCES_DATA: {
            if (!state.groups.includes(action.group)) throw new Error(`Unexpected group ${action.group} in preferences patch`);

            if (!state.preferencesData[action.group].hasOwnProperty(action.id)) {
                throw new Error(`Property with id ${action.id} not found. In prefrences patch.`);
            }

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
                preferenceData.columnCoefs = i.variants.map(e => 1.0);
                break;
            case "continuous":
                preferenceData.labels = i.labels;
                preferenceData.spreadPoints = new Array(propertiesData.globalParams.segmentsInPartion).fill(1.0);
        }

        res[i.group][i.id] = preferenceData;
    }

    return res;
};

export const setPossibleGroups = groups => ({type: SET_POSSIBLE_GROUPS, groups});
export const initPreferencesData = preferencesData => ({type: INIT_PREFERENCES_DATA, preferencesData});
export const patchPreferencesData = (group, id, newData) => ({type: PATCH_PREFERENCES_DATA, group, id, newData});

export default preferencesReducer;
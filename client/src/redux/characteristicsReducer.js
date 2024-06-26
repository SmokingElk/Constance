const SET_POSSIBLE_GROUPS = "SET-POSSIBLE-GROUPS";
const INIT_CHARACTERISTICS_DATA = "INIT-CHARACTERISTICS-DATA";
const LOAD_CHARACTERISTICS_DATA = "LOAD-CHARACTERISTICS-DATA" 
const PATCH_CHARACTERISTICS_DATA = "PATCH-CHARACTERISTICS-DATA";
const SET_FETCHING = "SET-FETCHING";
const ADD_PATCHER = "ADD-PATCHER";
const DELETE_PATCHER = "DELETE-PATCHER";

/*
Редьюсер для обработки состояний характеристик.
 */

const initialState = {
    demo: false,
    groups: [],
    characteristicsTree: {},
    characteristicsData: {},
    isFetching: false,
    patchers: [],
    isPatching: false,
};

const validateCharacteristicsDataKeys = (group, id, state, requiredType = "any") => {
    // проверка на корректность запроса на обновление характеристик. Проверяются ключи характеристики и вид предоставляемых данных.
    if (!state.groups.includes(group)) throw new Error(`Unexpected group ${group} in characteristic patch`);

    if (!state.characteristicsData[group].hasOwnProperty(id)) {
        throw new Error(`Characteristic with id ${id} not found. In characteristic patch.`);
    }

    if (requiredType === "any") return;

    if (state.characteristicsData[group][id].type !== requiredType) {
        throw new Error(`Not ${requiredType} characteristic can't be patched.`);
    }
}

const characteristicsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSSIBLE_GROUPS: {
            return {
                ...state,
                groups: action.groups,
            }
        }

        case INIT_CHARACTERISTICS_DATA: {
            let characteristicsTree = {};
            for (let group in action.characteristicsData) {
                characteristicsTree[group] = {};

                for (let id in action.characteristicsData[group]) {
                    characteristicsTree[group][id] = {
                        sex: action.characteristicsData[group][id].sex,
                        type: action.characteristicsData[group][id].type
                    };
                }
            }

            return {
                ...state,
                characteristicsTree: characteristicsTree,
                characteristicsData: action.characteristicsData,
            };
        }

        case LOAD_CHARACTERISTICS_DATA: {
            let newCharacteristicsData = JSON.parse(JSON.stringify(state.characteristicsData));

            for (let i of action.loadData) {
                let characteristicData = newCharacteristicsData[i.group][i.id];
                
                characteristicData.value = i.value;
            }

            return {
                ...state,
                characteristicsData: newCharacteristicsData,
            };
        }

        case PATCH_CHARACTERISTICS_DATA: {
            validateCharacteristicsDataKeys(action.group, action.id, state);

            return {
                ...state,
                characteristicsData: {
                    ...state.characteristicsData,
                    [action.group]: {
                        ...state.characteristicsData[action.group],
                        [action.id]: {
                            ...state.characteristicsData[action.group][action.id],
                            ...action.newData
                        },
                    }
                }
            };
        }

        case ADD_PATCHER: {
            return {
                ...state,
                isPatching: true,
                patchers: [...state.patchers, action.id], 
            }
        }

        case DELETE_PATCHER: {
            let patchers = state.patchers.filter(e => e !== action.id);

            return {
                ...state,
                isPatching: patchers.length > 0,
                patchers,
            }
        }

        case SET_FETCHING: {
            return {
                ...state,
                isFetching: action.value,
            }
        }

        default:
            return state;
    }
}

export const createCharacteristicsData = propertiesData => {
    let res = {};
    for (let i of propertiesData.globalParams.groups) res[i] = {};

    for (let i of propertiesData.propertiesData) {
        let characteristicData = {
            name: i.name,
            sex: i.sex,
            type: i.type,
            default: i.default,
        }

        switch (i.type) {
            case "binary":
                characteristicData.value = i.default;
                break;
            case "discrete":
                characteristicData.value = i.default;
                characteristicData.variants = i.variants;
                break;
            case "continuous":
                characteristicData.value = i.averageValue;
                characteristicData.labels = i.labels;
                characteristicData.range = i.range;
                break;
            default:
                break;
        }

        res[i.group][i.id] = characteristicData;
    }

    return res;
}

export const setPossibleCharacteristicsGroups = groups => ({type: SET_POSSIBLE_GROUPS, groups});
export const initCharacteristicsData = characteristicsData => ({type: INIT_CHARACTERISTICS_DATA, characteristicsData});
export const loadCharacteristicsData = loadData => ({type: LOAD_CHARACTERISTICS_DATA, loadData});
export const patchCharacteristicsData = (group, id, newData) => ({type: PATCH_CHARACTERISTICS_DATA, group, id, newData});
export const setCharacteristicsFetching = value => ({type: SET_FETCHING, value});
export const addCharacteristicsPatcher = id => ({type: ADD_PATCHER, id});
export const deleteCharacteristicsPatcher = id => ({type: DELETE_PATCHER, id});

export default characteristicsReducer;
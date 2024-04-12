const SET_POSSIBLE_GROUPS = "SET-POSSIBLE-GROUPS";
const INIT_PROPERTIES_DATA = "INIT-PROPERTIES-DATA";
const PATCH_PROPERTIES_DATA = "PATCH-PROPERTIES-DATA";

const initialState = {
    groups: [],
    propertiesData: {},
}

const preferencesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSSIBLE_GROUPS: {
            return {
                ...state,
                groups: action.groups,
            };
        }

        case INIT_PROPERTIES_DATA: {
            return {
                ...state,
                propertiesData: action.propertiesData,
            };
        }
        
        case PATCH_PROPERTIES_DATA: {
            if (!state.groups.includes(action.group)) throw new Error(`Unexpected group ${action.group} in preferences patch`);

            if (!state.groups[action.group].hasOwnProperty(action.id)) {
                throw new Error(`Property with id ${action.id} not found. In prefrences patch.`);
            }

            return {
                ...state,
                propertiesData: {
                    ...state.propertiesData,
                    [action.group]: {
                        ...state.propertiesData[action.group],
                        [action.id]: action.newData,
                    }
                }
            };
        }
    
        default:
            return state;
    }
}

export const initPropertiesData = propertiesData => ({type: INIT_PROPERTIES_DATA, propertiesData});

export default preferencesReducer;
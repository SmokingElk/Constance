const TOGGLE_INSTRUCTION = "TOGGLE-INSTRUCTION";

/*
Редьюсер для домашнего экрана приложения.
 */ 

const initialState = {
    instructionOpen: false,
};

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_INSTRUCTION: {
            return {
                ...state,
                instructionOpen: !state.instructionOpen,
            };
        }

        default:
            return state;
    }
};

export const toggleHomeInstructionSpoiler = () => ({type: TOGGLE_INSTRUCTION});

export default homeReducer;
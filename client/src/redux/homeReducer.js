const TOGGLE_INSTRUCTION = "TOGGLE-INSTRUCTION";

const initialState = {
    instructionOpen: false,
};

const homeReducer = (state = initialState, action) => {
    switch (state.type) {
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
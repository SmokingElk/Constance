const TOGGLE_NAVBAR = "TOGGLE-NAVBAR";

const initialState = {
    isOpen: false,
};

const navbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_NAVBAR: {
            return {
                ...state,
                isOpen: !state.isOpen,
            };
        }

        default:
            return state;
    }
}

export const toggleNavbar = () => ({type: TOGGLE_NAVBAR});

export default navbarReducer;


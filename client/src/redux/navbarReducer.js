const TOGGLE_NAVBAR = "TOGGLE-NAVBAR";

/*
Редьюсер для управления состоянием верхнего меню (из Header).
 */

const initialState = {
    isOpen: false,
};

const navbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_NAVBAR: {
            return {
                ...state,
                isOpen: action.isOpen,
            };
        }

        default:
            return state;
    }
}

export const toggleNavbar = isOpen => ({type: TOGGLE_NAVBAR, isOpen});

export default navbarReducer;


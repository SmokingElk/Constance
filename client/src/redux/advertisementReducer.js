const OPEN_ADVERTISEMENT = "OPEN-ADVERTISEMENT";

const initialState = {
    isOpen: false,
    openDelay: 1500,
}

const advertisementReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_ADVERTISEMENT: {
            return {
                ...state,
                isOpen: true,
            }
        }
    
        default:
            return state;
    }
}

export const openAdvertisement = () => ({type: OPEN_ADVERTISEMENT});

export default advertisementReducer;
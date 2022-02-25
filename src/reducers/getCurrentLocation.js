const initialState = {
    address: '',
    label: '',
    lat: 0,
    lng: 0,
}

const getCurrentAddress = (state = initialState, action) => {

    switch (action.type) {

        case 'getCurrentAddress':
            return {
                ...state,
                address: action.payload,

            }

        default:
            return state;

    }

}

export default getCurrentAddress; 
const initialState = {
    address: '',
    label:'',
    lat:0,
    lng:0,
    country: "",
    state: "",
    city: "",
    CountryCode: undefined,

}

const getFinalAddress = (state = initialState, action) => {

    switch (action.type) {

        case 'getFinalAddress':
            return {
                ...state,
                address: action.payload,
            
            }

        default:
            return state;

    }

}

export default getFinalAddress;


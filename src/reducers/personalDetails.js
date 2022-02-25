const personalDetails = (state = true, action) => {

    switch (action.type) {

        case 'personalDetails':
            return !state;

        default:
            return state;
    }


}

export default personalDetails
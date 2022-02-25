const dlat = (state = 0, action) => {

    switch (action.type) {

        case 'dlat':
            return action.payload;


        // {
        //     ...state,
        //     dlat: action.payload
        // }
        default:
            return state;

    }

}

export default dlat;
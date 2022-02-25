const dlong = (state = 0, action) => {

    switch (action.type) {

        case 'dlong':
            return action.payload;


        // {
        //     ...state,
        //     dlong: action.payload
        // }

        default:
            return state;

    }

}

export default dlong;
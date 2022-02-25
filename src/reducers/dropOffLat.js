const dropOffLat = (state = 0, action) => {

    switch (action.type) {

        case 'dropOffLat':
            return action.payload;


        default:
            return state;

    }

}

export default dropOffLat;
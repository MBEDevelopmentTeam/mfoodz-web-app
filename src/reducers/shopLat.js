const shopLat = (state = 0, action) => {

    switch (action.type) {

        case 'shopLat':
            return action.payload;

        default:
            return state;

    }

}

export default shopLat;
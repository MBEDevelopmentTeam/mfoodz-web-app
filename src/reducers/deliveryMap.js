const deliveryMap = (state = false, action) => {

    switch (action.type) {

        case 'deliveryMap':
            return !state;

        default:
            return state;

    }

}

export default deliveryMap;
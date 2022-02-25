const shopLong = (state = 0, action) => {

    switch (action.type) {

        case 'shopLong':
            return action.payload;

        default:
            return state;

    }

}

export default shopLong;
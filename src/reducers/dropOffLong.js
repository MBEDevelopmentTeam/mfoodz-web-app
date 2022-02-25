const dropOffLong = (state = 0, action) => {

    switch (action.type) {

        case 'dropOffLong':
            return action.payload;


        default:
            return state;

    }

}

export default dropOffLong;
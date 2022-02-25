const cameraLong = (state = 0, action) => {

    switch (action.type) {

        case 'cameraLong':
            return action.payload;


        default:
            return state;

    }

}

export default cameraLong;
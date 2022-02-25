const cameraLat = (state = 0, action) => {

    switch (action.type) {

        case 'cameraLat':
            return action.payload;


        default:
            return state;

    }

}

export default cameraLat;
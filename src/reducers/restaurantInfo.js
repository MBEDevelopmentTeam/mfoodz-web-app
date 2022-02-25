const restautrantInfo = (state = false, action) => {
    switch (action.type) {
        case 'restInfoDisplay':
            return !state;
        default:
            return state;

    }

}

export default restautrantInfo;
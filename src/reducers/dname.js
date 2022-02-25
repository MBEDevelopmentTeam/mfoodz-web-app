const dname = (state = '', action) => {

    switch (action.type) {

        case 'dname':
            return {
                ...state,
                dname: action.payload
            }

        default:
            return state;

    }

}

export default dname;
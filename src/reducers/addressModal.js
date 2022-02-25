const addressModal = (state = false, action) => {

    switch (action.type) {

        case 'addressModalShow':
            return state = true;

        case 'addressModalHide':
            return state = false;


        default:
            return state;

    }

}

export default addressModal;
const subMenu = (state = false, action) => {
    switch (action.type) {
        case 'subMenu':
            return !state;

        default:
            return state;
    }
}
export default subMenu; 


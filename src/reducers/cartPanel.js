import $ from 'jquery';
let windowwidth;


if ($(window).width() > 600) {

    windowwidth = '305px'

}
else {
    windowwidth = '0px';
}




const cartPanel = (state = windowwidth, action) => {

    switch (action.type) {
        case 'opencartpanel':
            return action.payload;

        default:
            return state;

    }

}   

export default cartPanel;
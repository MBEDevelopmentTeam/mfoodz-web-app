import $ from 'jquery';
let windowwidth;


if ($(window).width() > 800) {

    windowwidth = false

}
else {
    windowwidth = true;
}




const windowWidth = (state = windowwidth, action) => {

    switch (action.type) {
        case 'windowWidth':
            return state = false;

        default:
            return state;

    }

}

export default windowWidth;
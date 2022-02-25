import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import * as serviceWorker from "./serviceWorker";
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/Website/Carousel/carousel.css';
// import './components/MainPage/MainPage.css';
// import RestaurantClass from './components/ProductsPage/RestaurantClass'
//const rootElement = document.getElementById("root");
//ReactDOM.render(<App />, rootElement);
import { BrowserRouter, Route, Link } from "react-router-dom";


import { createStore } from 'redux'
import allReducers from './reducers'
import { Provider } from 'react-redux';

const updatedStore = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); 
export {updatedStore}; 
ReactDOM.render(






    <Provider store={updatedStore}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , document.querySelector("body"));

// ReactDOM.render(
//     <Deliverypanel />
//     ,document.querySelector("body"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

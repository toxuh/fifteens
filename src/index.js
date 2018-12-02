import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import {
    INITIAL_ARRAY,
    INITIAL_POSITION_OF_EMPTY_CELL
} from "./constants";

const initialState = {
    initialArray: INITIAL_ARRAY,
    emptyIndex: INITIAL_POSITION_OF_EMPTY_CELL,
    mixedArray: null,
    win: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MIX_ARRAY': {
            const mixedArray = state.initialArray.sort(() => Math.random()-.5).concat('empty');

            return {
                ...state,
                mixedArray
            }
        }
        case 'UPDATE_BOARD': {
            const {
                mixedArray,
                emptyIndex
            } = action.payloads;

            return {
                ...state,
                mixedArray,
                emptyIndex
            }
        }
        case 'CHECK_GAME': {
            const win = !state.mixedArray.some((item, index) => {
                return (item > 0) && (item -1 !== index)
            });

            return {
                ...state,
                win
            }
        }
        default: {
            return state;
        }
    }
};

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

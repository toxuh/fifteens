import LocalStorage from '../helpers/LS'
import {
    INITIAL_ARRAY,
    INITIAL_POSITION_OF_EMPTY_CELL, LOCALSTORAGE_SESSION_NAME
} from "../constants";

const initialState = {
    initialArray: INITIAL_ARRAY,
    emptyIndex: INITIAL_POSITION_OF_EMPTY_CELL,
    mixedArray: null,
    win: false,
    moves: 0,
    isSavedSession: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MIX_ARRAY': {
            const mixedArray = state.initialArray.sort(() => Math.random()-.5).concat('empty');

            return {
                ...state,
                mixedArray,
                moves: 0
            }
        }
        case 'LOAD_GAME': {
            const {
                mixedArray,
                emptyIndex,
                moves
            } = action.payloads;

            return {
                ...state,
                mixedArray,
                emptyIndex,
                moves,
                isSavedSession: true
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
        case 'MOVE': {
            return {
                ...state,
                moves: state.moves + 1
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
        case 'SAVE_GAME': {
            const game = {
                array: state.mixedArray,
                empty: state.emptyIndex,
                moves: state.moves
            };

            LocalStorage.set(LOCALSTORAGE_SESSION_NAME, JSON.stringify(game));

            return state;
        }
        default: {
            return state;
        }
    }
};

export default reducer;
import clonedeep from '../helpers/clonedeep'

import LocalStorage from '../helpers/LS'
import {
    INITIAL_ARRAY,
    INITIAL_POSITION_OF_EMPTY_CELL,
    LOCALSTORAGE_HISTORY_NAME
} from "../constants";

const initialState = {
    initialArray: INITIAL_ARRAY,
    emptyIndex: INITIAL_POSITION_OF_EMPTY_CELL,
    mixedArray: null,
    win: false,
    moves: 0,
    isSavedSession: false,
    history: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MIX_ARRAY': {
            const mixedArray = state.initialArray.sort(() => Math.random()-.5).concat('empty');
            const tmp = clonedeep(mixedArray);

            return {
                ...state,
                mixedArray,
                moves: 0,
                emptyIndex: INITIAL_POSITION_OF_EMPTY_CELL,
                win: false,
                isSavedSession: false,
                history: [
                    {
                        mixedArray: tmp,
                        moves: 0,
                        emptyIndex: INITIAL_POSITION_OF_EMPTY_CELL
                    }
                ]
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
            const tmp = clonedeep(state.history);
            const { emptyIndex, mixedArray } = action.payloads;
            const tmpMixed = clonedeep(mixedArray);

            tmp.push({
                emptyIndex,
                mixedArray: tmpMixed,
                moves: state.moves
            });

            return {
                ...state,
                mixedArray,
                emptyIndex,
                history: tmp
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
        case 'UNDO': {
            const history = LocalStorage.get(LOCALSTORAGE_HISTORY_NAME);

            if (history) {
                const parsed = JSON.parse(history);

                if (parsed.length > 1) {
                    const lastMove = parsed[parsed.length - 2];
                    const {
                        mixedArray,
                        emptyIndex,
                        moves
                    } = lastMove;

                    parsed.splice(-1, 1);

                    return {
                        ...state,
                        mixedArray,
                        emptyIndex,
                        moves,
                        history: parsed
                    }
                } else {
                    alert('Nothing to undo');
                }
            }

            return state;
        }
        case 'UPDATE_HISTORY': {
            LocalStorage.set(LOCALSTORAGE_HISTORY_NAME, JSON.stringify(state.history));

            return state;
        }
        default: {
            return state;
        }
    }
};

export default reducer;
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Game from './components/Game';
import LocalStorage from './helpers/LS'

import {
    LOCALSTORAGE_SESSION_NAME
} from './constants'

import './App.css';

class App extends Component {
    componentDidMount = () => {
        if (LocalStorage.get(LOCALSTORAGE_SESSION_NAME)) {
            const game = JSON.parse(LocalStorage.get(LOCALSTORAGE_SESSION_NAME));

            this.props.dispatch({
                type: 'UPDATE_BOARD',
                payloads: {
                    mixedArray: game.array,
                    emptyIndex: game.empty
                }
            })
        } else {
            this.props.dispatch({
                type: 'MIX_ARRAY'
            })
        }
    };

    saveGame = (array, empty) => {
        const game = {
            array,
            empty
        };

        LocalStorage.set(LOCALSTORAGE_SESSION_NAME, JSON.stringify(game));
    };

    updateMixedCells = (array, empty) => {
        this.props.dispatch({
            type: 'UPDATE_BOARD',
            payloads: {
                mixedArray: array,
                emptyIndex: empty
            }
        });
    };

    checkResult = () => {
        this.props.dispatch({
            type: 'CHECK_GAME'
        })
    };

    render() {
        const {
            mixedArray,
            emptyIndex,
            win
        } = this.props;

        return (
            <div className="App">
                {mixedArray &&
                    <Game
                        array={mixedArray}
                        emptyIndex={emptyIndex}
                        isWin={win}
                        onUpdate={this.updateMixedCells}
                        onSaveGame={this.saveGame}
                        onCheckResult={this.checkResult}
                    />
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    initialArray: state.initialArray,
    emptyIndex: state.emptyIndex,
    mixedArray: state.mixedArray,
    win: state.win
});

export default connect(mapStateToProps)(App);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Game from './containers/Game';
import Info from './containers/Info';

import H1 from "./components/H1/H1";
import P from "./components/P/P";

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
                type: 'LOAD_GAME',
                payloads: {
                    mixedArray: game.array,
                    emptyIndex: game.empty,
                    moves: game.moves
                }
            })
        } else {
            this.props.dispatch({
                type: 'MIX_ARRAY'
            })
        }
    };

    saveGame = () => {
        this.props.dispatch({
            type: 'SAVE_GAME'
        });
    };

    onUpdateMixedCells = (array, empty) => {
        this.props.dispatch({
            type: 'UPDATE_BOARD',
            payloads: {
                mixedArray: array,
                emptyIndex: empty
            }
        });
    };

    onCheckResult = () => {
        this.props.dispatch({
            type: 'CHECK_GAME'
        })
    };

    onIncrementMoves = () => {
        this.props.dispatch({
            type: 'MOVE'
        });
    };

    onResetGame = () => {
        LocalStorage.remove(LOCALSTORAGE_SESSION_NAME);

        this.props.dispatch({
            type: 'MIX_ARRAY'
        })
    };

    render() {
        const {
            mixedArray,
            emptyIndex,
            win,
            moves,
            isSavedSession
        } = this.props;

        return (
            <div className="App">
                <H1 cn="App__heading">Fifteens game</H1>
                { isSavedSession && (
                    <P cn="App__lead">
                        Yor game was restored from last session.
                    </P>
                ) }
                <Info
                    moves={moves}
                    onResetGame={this.onResetGame}
                />
                {mixedArray &&
                    <Game
                        array={mixedArray}
                        emptyIndex={emptyIndex}
                        isWin={win}
                        onUpdate={this.onUpdateMixedCells}
                        onSaveGame={this.saveGame}
                        onCheckResult={this.onCheckResult}
                        onMove={this.onIncrementMoves}
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
    win: state.win,
    moves: state.moves,
    isSavedSession: state.isSavedSession
});

export default connect(mapStateToProps)(App);

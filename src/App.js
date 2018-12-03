import React, { Component } from 'react';
import { connect } from 'react-redux';

import Game from './containers/Game';
import Info from './containers/Info';

import H1 from "./components/H1/H1";
import P from "./components/P/P";

import LocalStorage from './helpers/LS'

import {
    LOCALSTORAGE_HISTORY_NAME,
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
            });

            this.props.dispatch({
                type: 'UPDATE_HISTORY'
            });
        }
    };

    saveSession = () => {
        const game = {
            array: this.props.mixedArray,
            empty: this.props.emptyIndex,
            moves: this.props.moves
        };

        LocalStorage.set(LOCALSTORAGE_SESSION_NAME, JSON.stringify(game));
    };

    onUpdateMixedCells = (array, empty) => {
        this.props.dispatch({
            type: 'UPDATE_BOARD',
            payloads: {
                mixedArray: array,
                emptyIndex: empty
            }
        });

        this.props.dispatch({
            type: 'UPDATE_HISTORY'
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
        LocalStorage.remove(LOCALSTORAGE_HISTORY_NAME);

        this.props.dispatch({
            type: 'MIX_ARRAY'
        });

        this.props.dispatch({
            type: 'UPDATE_HISTORY'
        });
    };

    onUndo = () => {
        this.props.dispatch({
            type: 'UNDO'
        });

        this.props.dispatch({
            type: 'UPDATE_HISTORY'
        });
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
                    isWin={win}
                    onResetGame={this.onResetGame}
                    onUndo={this.onUndo}
                />
                {mixedArray &&
                    <Game
                        array={mixedArray}
                        emptyIndex={emptyIndex}
                        onUpdate={this.onUpdateMixedCells}
                        onSaveGame={this.saveSession}
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
    isSavedSession: state.isSavedSession,
    history: state.history
});

export default connect(mapStateToProps)(App);

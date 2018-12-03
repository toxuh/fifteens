import React, { Component } from 'react';
import PropTypes from 'prop-types';

import P from "../../components/P";
import Button from "../../components/Button/Button";
import Span from "../../components/Span/Span";

import './Info.css';

class Info extends Component {
    static propTypes = {
        moves: PropTypes.number,
        isWin: PropTypes.bool,
        onResetGame: PropTypes.func,
        onUndo: PropTypes.func
    };

    resetGame = () => {
        this.props.onResetGame();
    };

    undo = () => {
        this.props.onUndo();
    };

    render() {
        return (
            <div className="Info">
                <P cn="Info__steps">
                    {this.props.isWin ? (
                        <Span cn="Info__greetings">YOU WIN! Number of moves: {this.props.moves}</Span>
                    ) : (
                        <Span>
                            Moves:
                            <Span cn="Info__counter">{this.props.moves}</Span>
                            <Button
                                cn="Info__button"
                                onClick={this.undo}
                            >
                            Undo
                        </Button>
                        </Span>
                    )}
                    <Button
                        cn="Info__button"
                        onClick={this.resetGame}
                    >
                        Reset Game
                    </Button>
                </P>
            </div>
        )
    }
}

export default Info;
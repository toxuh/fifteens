import React, { Component } from 'react';
import PropTypes from 'prop-types';

import P from "../../components/P";
import Button from "../../components/Button/Button";

import './Info.css';
import Span from "../../components/Span/Span";

class Info extends Component {
    static propTypes = {
        moves: PropTypes.number,
        onResetGame: PropTypes.func
    };

    resetGame = () => {
        this.props.onResetGame();
    };

    render() {
        return (
            <div className="Info">
                <P cn="Info__steps">
                    Moves:
                    <Span cn="Info__counter">{this.props.moves}</Span>
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
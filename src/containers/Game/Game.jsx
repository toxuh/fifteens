import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Div from "../../components/Div";

import {
    POSSIBLE_STEPS
} from "../../constants/index";

import './Game.css';

class Game extends Component {
    static propTypes = {
        array: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ])),
        emptyIndex: PropTypes.number,
        onUpdate: PropTypes.func,
        onSaveGame: PropTypes.func,
        onCheckResult: PropTypes.func,
        onMove: PropTypes.func
    };

    clickHandler = (e) => {
        const {
            emptyIndex,
            array
        } = this.props;
        const number = e.target.innerText;

        // If click on number cell
        if (number) {
            const index = array.findIndex(i => i === parseInt(number));

            POSSIBLE_STEPS.forEach(step => {
                // Checks that it is possible move
                if (
                    ((emptyIndex + step < 16) && (emptyIndex + step === index)) ||
                    ((emptyIndex + step > 0) && (emptyIndex + step === index))
                ) {
                    this.move(index);
                }
            })
        }
    };

    move = (newIndex) => {
        const {
            emptyIndex,
            array,
            onUpdate,
            onSaveGame,
            onCheckResult,
            onMove
        } = this.props;
        const empty = array[emptyIndex];
        const newValue = array[newIndex];

        // Making array with new positions
        array[newIndex] = empty;
        array[emptyIndex] = newValue;

        // Increment moves counter
        onMove();

        // Update app with new array
        onUpdate(array, newIndex);

        // Save current game to local storage
        onSaveGame();

        // Check if game over
        onCheckResult();
    };

    render() {
        const { array } = this.props;

        return (
            <div className="Game">
                {array.map(number => {
                    const empty = number === 'empty' ? 'empty' : '';

                    return (
                        <Div
                            key={ number }
                            cn={`Game__cell ${empty}`}
                            onClick={this.clickHandler}
                        >
                            { number !== 'empty' && number }
                        </Div>
                    )
                })}
            </div>
        )
    }
}

export default Game;
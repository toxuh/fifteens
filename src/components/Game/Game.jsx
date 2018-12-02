import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Game.css';

class Game extends Component {
    static propTypes = {
        array: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ])),
        emptyIndex: PropTypes.number,
        onUpdate: PropTypes.func,
        onSaveGame: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.steps = [-4, 1, +4, -1]; // Top, right, down, left

        this.state = {
            win: false
        };
    }

    clickHandler = (e) => {
        const {
            emptyIndex,
            array
        } = this.props;
        const id = e.target.innerText;

        // If click on number cell
        if (id) {
            const index = array.findIndex(i => i === parseInt(id));

            this.steps.forEach(step => {
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
            onSaveGame
        } = this.props;
        const empty = array[emptyIndex];
        const newValue = array[newIndex];

        // Making array with new positions
        array[newIndex] = empty;
        array[emptyIndex] = newValue;

        // Update app with new array
        onUpdate(array, newIndex);

        // Check if game over
        this.checkResult();

        // Save current game to local storage
        onSaveGame(array, newIndex);
    };

    checkResult() {
        const win = !this.props.array.some((item, index) => {
            return (item > 0) && (item -1 !== index)
        });

        this.setState({
            win
        })
    }

    render() {
        const { array } = this.props;

        return (
            <div className="Game">
                {array.map(number => {
                    const empty = number === 'empty' ? 'empty' : '';

                    return (
                        <div
                            key={ number }
                            className={`Game__cell ${empty}`}
                            onClick={this.clickHandler}
                        >
                            { number !== 'empty' && number }
                        </div>
                    )
                })}
                <h1>
                    {this.state.win && (
                        <span>WIN!!!</span>
                    )}
                </h1>
            </div>
        )
    }
}

export default Game;
import React, { Component } from 'react';

import './Game.css';

class Game extends Component {
    constructor(props) {
        super(props);

        this.steps = [-4, 1, +4, -1]; // Top, right, down, left

        this.state = {
            win: false,
            emptyIndex: 15 // Initial position of empty cell
        };
    }

    clickHandler = (e) => {
        const { emptyIndex } = this.state;
        const id = e.target.innerText;

        // If click on number cell
        if (id) {
            const index = this.props.array.findIndex(i => i === parseInt(id));

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
        const { emptyIndex } = this.state;
        const arr = this.props.array;
        const empty = arr[emptyIndex];
        const newValue = arr[newIndex];

        // Making array with new positions
        arr[newIndex] = empty;
        arr[emptyIndex] = newValue;

        // Change empty cell position
        this.setState({
            emptyIndex: newIndex
        });

        // Update app with new array
        this.props.onUpdate(arr);

        // Check if game over
        this.checkResult();
    };

    checkResult() {
        const { array } = this.props;
        const notValidItems = [];

        // Check that items in array in ascending order. 14 - to not check empty cell
        for (let i = 0; i < 14; i++) {
            const test = (array[i] + 1 !== array[i + 1]) && notValidItems.push(array[i + 1]);
        }

        if (notValidItems.length === 0) {
            this.setState({
                win: true
            })
        }
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
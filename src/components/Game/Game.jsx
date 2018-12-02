import React, { Component } from 'react';

import './Game.css';

class Game extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { array } = this.props;

        return (
            <div className="Game">
                {array.map(number => {
                    const empty = number === 0 ? 'empty' : '';

                    return (
                        <div className={`Game__cell ${empty}`}>{ number }</div>
                    )
                })}
            </div>
        )
    }
}

export default Game;
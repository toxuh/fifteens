import React, { Component } from 'react';

import Game from './components/Game';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; //16th for empty cell

        this.state = {
            mixed: null
        };
    }

    componentDidMount = () => {
        this.mixCells()
    };

    mixCells = () => {
        // Get numbers array, mix it, concat empty cell
        const mixedArray = this.array.sort(() => Math.random()-.5).concat('empty');

        this.setState({
            mixed: mixedArray
        })
    };

    updateMixedCells = (arr) => {
        this.setState({
            mixed: arr
        });
    };

    render() {
        return (
            <div className="App">
                {this.state.mixed && <Game array={this.state.mixed} onUpdate={this.updateMixedCells} />}
            </div>
        );
    }
}

export default App;

import React, { Component } from 'react';

import Game from './components/Game';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; //16th for null

        this.state = {
            mixed: null
        };
    }

    componentDidMount() {
        this.mixCells()
    }

    mixCells = () => {
        let mixedArray = this.array.sort(function() { return Math.random()-.5; }).concat(0);

        this.setState({
            mixed: mixedArray
        })
    };

    render() {
        return (
            <div className="App">
                {this.state.mixed && <Game array={this.state.mixed} />}
            </div>
        );
    }
}

export default App;

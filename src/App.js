import React, { Component } from 'react';
import {Provider} from 'react-redux';
import Board from './components/Board';
import store from './js/store/store';
import './styles.css';


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Board />
                </div>
            </Provider>
        );
    }
}

export default App;

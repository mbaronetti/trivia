import React, { Component } from 'react';
import {Provider} from 'react-redux';
import Board from './components/Board';
import store from './js/store/store';
import logo from './logo.svg';
import './App.css';


console.log(store);
console.log(store.getState());

//store.subscribe(() => console.log(store.getState()))
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

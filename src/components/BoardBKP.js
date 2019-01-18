import React, { Component } from 'react';
import {connect} from 'react-redux';
import './../styles.css';

const mapStateToProps = (state) => {
    return {
        counterVal: state.counterVal
    }
}

class Board extends Component {
    render() {
        const {counterVal} = this.props;
        return (
            <div className="board">   
                <p style={{fontSize: '48px' , color: 'tomato'}}>VALUE: {counterVal}</p>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Board);
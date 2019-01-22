import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Icon} from 'antd';
import uuidv1 from 'uuid';

const mapStateToProps = (state) => {
    return {
        correctAnswers: state.correctAnswers,
        dataLength: state.dataLength,
        currentResult: state.currentResult,
        results: state.results
    }
}

class Results extends Component {
    render() {
        const {correctAnswers, dataLength, results} = this.props;
        return (
            <div className="board">   
                {correctAnswers < dataLength / 3 && 
                    <Icon className="result-icon" type="frown" style={{color: '#e74c3c'}}/>}
            
                {correctAnswers > dataLength / 3 && correctAnswers < dataLength / 1.5 && 
                    <Icon className="result-icon" type="meh" style={{color: '#e0e0e0'}}/>}
            
                {correctAnswers > dataLength / 1.5 && 
                    <Icon className="result-icon" type="smile" style={{color: '#2ecc71'}}/>}
            
                <p className="bold font-medium">
                    You answered {correctAnswers} out of {dataLength} questions correct.
                </p>
                <ul>{results.map(item => <li key={uuidv1()}>
                    {
                        item.val ? <Icon className="valid" type="plus-circle" />:<Icon className="invalid" type="minus-circle" />
                    }
                    <span className="board-result-item">
                    {
                        item.currentResult.replace(/&quot;/g , '"').replace(/&#039;/g , "'")
                    }
                    </span>
                        <p className="font-italic color-gray">Correct answer: {item.correctAnswer}</p>
                    </li>)
                    }
                </ul>
            </div>
            
        );
    }
}

export default connect(mapStateToProps)(Results);
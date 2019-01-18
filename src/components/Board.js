import React, { Component } from 'react';
import {connect} from 'react-redux';
import {incrementCounter, decrementCounter, resetCounter, setData, setDataLength, setCurrentQuestion, answerValid, answerInvalid, appDidLoad, setResult, endTrivia} from '../js/actions/actions';
import {Button, Icon, Card, Progress} from 'antd';
import './../styles.css';
import uuidv1 from 'uuid';

const url = "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean";

const mapStateToProps = (state) => {
    return {
        counterVal: state.counterVal,
        data: state.data,
        dataLength: state.dataLength,
        currentQuestion: state.currentQuestion,
        currentCategory: state.currentCategory,
        currentCorrectAnswer: state.currentCorrectAnswer,
        correctAnswers: state.correctAnswers,
        appLoaded: state.appLoaded,
        currentDifficulty: state.currentDifficulty,
        results: state.results,
        showResults: state.showResults
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        incrementCounter: (counterVal,val) => dispatch(incrementCounter(counterVal,val)),
        decrementCounter: (counterVal,val) => dispatch(decrementCounter(counterVal,val)),
        resetCounter: () => dispatch(resetCounter()),
        setData: (data) => dispatch(setData(data)),
        setDataLength: (val) => dispatch(setDataLength(val)),
        setCurrentQuestion: (val) => dispatch(setCurrentQuestion(val)),
        answerValid: () => dispatch(answerValid()),
        answerInvalid: () => dispatch(answerInvalid()),
        appDidLoad: (val) => dispatch(appDidLoad(val)),
        setResult: (currentResult , val) => dispatch(setResult(currentResult , val)),
        endTrivia: (val) => dispatch(endTrivia(val))
    }
}


class Counter extends Component {
    componentDidMount(){
        fetch(url)
        .then(response => response.json())
        .then(data => {
            this.props.appDidLoad(true);
            this.props.setData(data.results);
            this.props.setDataLength(data.results.length);
            this.props.setCurrentQuestion(data.results[0]);
            console.log(data.results.length);
        })
        .catch('error')
    }
    answerQuestion = (val, counterVal, data, currentCorrectAnswer) => {
        this.props.incrementCounter(counterVal , 1);
        const correct = val == JSON.parse(currentCorrectAnswer.toLowerCase()) 
        correct?this.props.answerValid():this.props.answerInvalid()
        if(counterVal < data.length){
            this.props.setCurrentQuestion(data[counterVal]);
        }else{
            this.props.endTrivia(true);
        }
        if(counterVal <= data.length)this.props.setResult(data[counterVal - 1].question , correct);
        console.log(this.props.results)
        console.log(val, counterVal, data, currentCorrectAnswer);
    }
    
    render() {
        const {counterVal , data, dataLength, currentQuestion, currentCategory, currentCorrectAnswer, correctAnswers, appLoaded, currentDifficulty, results, showResults} = this.props;
        return (
            <div className="board">  
                {
                    !appLoaded && 
                    <div className="app-loading">
                        <Icon type="loading" />
                        <p>Loading...</p>
                    </div>
                }
                <Card title={showResults?'Results' : currentCategory}
                      style={{ width: 800, maxWidth: '100%', margin: '50px auto' }}>
                {!showResults && 
                    <div>  
                        <p className="board-primary-text">{currentQuestion && currentQuestion.replace(/&quot;/g , '"').replace(/&#039;/g , "'")}</p>
                        <p className="board-primary-text d-none">{currentCorrectAnswer}</p>
                        <Progress percent={(counterVal - 1) / dataLength * 100} size="small" status="success" showInfo={false} />
                        <p className="board-seconadry-text">{counterVal - 1} / {dataLength}</p>
                        <p className="board-seconadry-text d-none">correctAnswers: {correctAnswers}</p>
                    </div>
                }
                {showResults && <div>
                    <p className="bold">You answered {correctAnswers} out of {dataLength} questions correct </p>
                    <ul>{results.map(item => <li key={uuidv1()}>{item.val?<Icon className="valid" type="plus-circle" />:<Icon className="invalid" type="minus-circle" />}<span className="board-result-item">{item.currentResult}</span> </li>)}</ul>
                    </div>}
                {
                    counterVal <= dataLength && 
                    <div>
                        <Button className="board-button" type="danger" onClick={() =>       {this.answerQuestion(false, counterVal, data, currentCorrectAnswer)}}>
                            FALSE
                        </Button>
                        <Button className="board-button" type="primary" onClick={() => {this.answerQuestion(true, counterVal, data, currentCorrectAnswer)}}>
                            TRUE
                        </Button>
                    </div>
                }
                </Card>
            </div>
        );
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(Counter);
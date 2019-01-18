import React, { Component } from 'react';
import {connect} from 'react-redux';
import {incrementCounter, setData, setDataLength, setCurrentQuestion, answerValid, answerInvalid, appDidLoad, setResult, endTrivia, setTitle, startTrivia} from '../js/actions/actions';
import {Button, Icon, Card, Progress} from 'antd';
import Results from './Results';
import './../styles.css';
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
        showResults: state.showResults,
        currentTitle: state.currentTitle,
        triviaStarted: state.triviaStarted
        
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        incrementCounter: (counterVal,val) => dispatch(incrementCounter(counterVal,val)),
        setData: (data) => dispatch(setData(data)),
        setDataLength: (val) => dispatch(setDataLength(val)),
        setCurrentQuestion: (val) => dispatch(setCurrentQuestion(val)),
        answerValid: () => dispatch(answerValid()),
        answerInvalid: () => dispatch(answerInvalid()),
        appDidLoad: (val) => dispatch(appDidLoad(val)),
        setResult: (currentResult , val) => dispatch(setResult(currentResult , val)),
        endTrivia: (val) => dispatch(endTrivia(val)),
        setTitle: (val) => dispatch(setTitle(val)),
        startTrivia: (val) => dispatch(startTrivia(val))
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
            this.props.setTitle(this.props.currentCategory);
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
            this.props.setTitle(this.props.currentCategory);
        }else{
            this.props.endTrivia(true);
            this.props.setTitle('Results');
        }
        if(counterVal <= data.length)this.props.setResult(data[counterVal - 1].question , correct);
        console.log(this.props.results)
        console.log(val, counterVal, data, currentCorrectAnswer);
    }
    
    render() {
        const {counterVal , data, dataLength, currentQuestion, currentCategory, currentCorrectAnswer, correctAnswers, appLoaded, currentDifficulty, showResults, triviaStarted} = this.props;
        return (
            <div className="board">  
                {
                    !appLoaded && 
                    <div className="app-loading">
                        <Icon type="loading" />
                        <p>Loading...</p>
                    </div>
                }
                <Card className="board-card" title={triviaStarted?this.props.currentTitle:'Trivia Challenge!'}
                      >
                {!showResults && triviaStarted &&
                    <div>  
                        <p className="board-primary-text">{currentQuestion && currentQuestion.replace(/&quot;/g , '"').replace(/&#039;/g , "'")}</p>
                        <p className="board-primary-text d-none">{currentCorrectAnswer}</p>
                        <Progress percent={(counterVal - 1) / dataLength * 100} size="small" status="success" showInfo={false} />
                        <p className="board-seconadry-text">{counterVal - 1} / {dataLength}</p>
                        <p className="board-seconadry-text d-none">correctAnswers: {correctAnswers}</p>
                    </div>
                }
                {showResults && <Results /> }
                {
                    !triviaStarted && 
                    <div>
                        <p className="bold font-medium">You will be presented with 10 True or false Question</p>
                        <footer>
                            <Button className="board-button" type="danger" onClick={() => {this.props.startTrivia(true)}}>
                                START
                            </Button>
                        </footer>
                    </div>
                }
                {
                    triviaStarted && counterVal <= dataLength && 
                    <footer>
                        <Button className="board-button" type="danger" onClick={() =>       {this.answerQuestion(false, counterVal, data, currentCorrectAnswer)}}>
                            FALSE
                        </Button>
                        <Button className="board-button" type="primary" onClick={() => {this.answerQuestion(true, counterVal, data, currentCorrectAnswer)}}>
                            TRUE
                        </Button>
                    </footer>
                }
                {
                    triviaStarted && counterVal > dataLength && 
                    <footer>
                        <Button className="board-button" type="primary" onClick={() => {window.location.reload()}}>
                            PLAY AGAIN
                        </Button>
                    </footer>
                }
                </Card>
            </div>
        );
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(Counter);
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Button} from 'antd';
import {incrementCounter, setCurrentQuestion, answerValid, answerInvalid, setResult, endTrivia, setTitle, startTrivia} from '../js/actions/actions';
import './../styles.css';


const mapStateToProps = (state) => {
    return {
        counterVal: state.counterVal,
        data: state.data,
        dataLength: state.dataLength,
        currentCategory: state.currentCategory,
        currentCorrectAnswer: state.currentCorrectAnswer,
        triviaStarted: state.triviaStarted
        
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        incrementCounter: (counterVal,val) => dispatch(incrementCounter(counterVal,val)),
        setCurrentQuestion: (val) => dispatch(setCurrentQuestion(val)),
        answerValid: () => dispatch(answerValid()),
        answerInvalid: () => dispatch(answerInvalid()),
        setResult: (currentResult , val) => dispatch(setResult(currentResult , val)),
        endTrivia: (val) => dispatch(endTrivia(val)),
        setTitle: (val) => dispatch(setTitle(val)),
        startTrivia: (val) => dispatch(startTrivia(val))
    }
}

class Footer extends Component {
    answerQuestion = (val, counterVal, data, currentCorrectAnswer) => {
        this.props.incrementCounter(counterVal , 1);
        const correct = val === JSON.parse(currentCorrectAnswer.toLowerCase()) 
        correct?this.props.answerValid():this.props.answerInvalid()
        if(counterVal < data.length){
            this.props.setCurrentQuestion(data[counterVal]);
            this.props.setTitle(this.props.currentCategory);
        }else{
            this.props.endTrivia(true);
            this.props.setTitle('Results');
        }
        if(counterVal <= data.length)this.props.setResult(data[counterVal - 1].question , correct);
        console.log(val, counterVal, data, currentCorrectAnswer);
    }
    
    render() {
        const {counterVal , data, dataLength, currentCorrectAnswer, triviaStarted} = this.props;
        if(triviaStarted && counterVal <= dataLength)
        return (
                <footer>
                    <Button className="board-button" type="danger" onClick={() =>       {this.answerQuestion(false, counterVal, data, currentCorrectAnswer)}}>
                        FALSE
                    </Button>
                    <Button className="board-button" type="primary" onClick={() => {this.answerQuestion(true, counterVal, data, currentCorrectAnswer)}}>
                        TRUE
                    </Button>
                </footer>
            );
        if(triviaStarted && counterVal > dataLength)
            return(
                <footer>
                    <Button className="board-button" type="primary" onClick={() => {window.location.reload()}}>
                        PLAY AGAIN
                    </Button>
                </footer>
            );
        if(!triviaStarted)
            return(
                <footer>
                    <Button className="board-button" type="danger" onClick={() => {this.props.startTrivia(true)}}>
                        START
                    </Button>
                </footer>
            );
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
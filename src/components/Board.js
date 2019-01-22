import React, { Component } from 'react';
import {connect} from 'react-redux';
import {setData, setDataLength, setCurrentQuestion, appDidLoad, setTitle} from '../js/actions/actions';
import {Icon, Card, Progress, Modal} from 'antd';
import Results from './Results';
import Footer from './Footer';
import './../styles.css';
const url = "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean";

const mapStateToProps = (state) => {
    return {
        counterVal: state.counterVal,
        data: state.data,
        dataLength: state.dataLength,
        currentQuestion: state.currentQuestion,
        currentCategory: state.currentCategory,
        appLoaded: state.appLoaded,
        showResults: state.showResults,
        currentTitle: state.currentTitle,
        triviaStarted: state.triviaStarted
        
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        setData: (data) => dispatch(setData(data)),
        setDataLength: (val) => dispatch(setDataLength(val)),
        setCurrentQuestion: (val) => dispatch(setCurrentQuestion(val)),
        appDidLoad: (val) => dispatch(appDidLoad(val)),
        setTitle: (val) => dispatch(setTitle(val))
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
        })
        .catch(() => {
            Modal.error({
                title: 'Error',
                content: 'Error occured while loading data.'
              });
        })
    }
    
    render() {
        const {counterVal , currentTitle , dataLength, currentQuestion, appLoaded, showResults, triviaStarted} = this.props;
        return (
            <div className="board">  
                {
                    !appLoaded && 
                    <div className="app-loading">
                        <Icon type="loading" />
                        <p>Loading...</p>
                    </div>
                }
                <Card className="board-card" 
                      title={triviaStarted?currentTitle:'Trivia Challenge!'}>
                    {!showResults && triviaStarted &&
                        <div>  
                            <p  className="board-primary-text">
                                {currentQuestion && currentQuestion.replace(/&quot;/g , '"').replace(/&#039;/g , "'")}
                            </p>
                            <Progress percent={(counterVal - 1) / dataLength * 100} 
                                      size="small" 
                                      status="success" 
                                      showInfo={false} />
                            <p className="board-seconadry-text">
                                {counterVal - 1} / {dataLength}
                            </p>
                        </div>
                    }
                    {
                        !triviaStarted && 
                        <div>
                            <p className="bold font-medium">You will be presented with 10 True or false Question</p>
                            <p className="bold font-medium">READY?</p>
                        </div>
                    }
                    <Footer />
                    {showResults && <Results /> }
                </Card>
            </div>
        );
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(Counter);
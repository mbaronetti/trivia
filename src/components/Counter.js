import React, { Component } from 'react';
import {connect} from 'react-redux';
import {incrementCounter, decrementCounter, resetCounter, setData} from '../js/actions/actions';
import {Button, Icon} from 'antd';
import './../styles.css';
import uuidv1 from 'uuid';

const incrementVal = 2;
const url = "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean";

const mapStateToProps = (state) => {
    return {
        counterVal: state.counterVal,
        data: state.data
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        incrementCounter: (counterVal,val) => dispatch(incrementCounter(counterVal,val)),
        decrementCounter: (counterVal,val) => dispatch(decrementCounter(counterVal,val)),
        resetCounter: () => dispatch(resetCounter()),
        setData: (data) => dispatch(setData(data))
    }
}


class Counter extends Component {
    componentDidMount(){
        fetch(url)
        .then(response => response.json())
        .then(data => {this.props.setData(data.results)})
        .catch('error')
    }
    
    render() {
        const {counterVal , data} = this.props;
        return (
            <div className="counter">   
                <p>VALUE: {counterVal}</p>
                <Button type="primary" onClick={() => this.props.incrementCounter(counterVal, incrementVal)}>
                    <Icon type="plus-circle" />
                </Button>
                <Button type="primary" onClick={() => this.props.decrementCounter(counterVal, incrementVal)}>
                    <Icon type="minus-circle" />
                </Button>
                <Button type="primary" onClick={() => this.props.resetCounter()}>
                    RESET
                </Button>
                {data.map(item => <li key={uuidv1()}>{item.category}</li>)}
            </div>
        );
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(Counter);
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';
export const SET_DATA = 'SET_DATA';
export const SET_DATA_LENGTH = 'SET_DATA_LENGTH';
export const SET_CURRENT_QUESTION = 'SET_CURRENT_QUESTION';
export const ANSWER_INVALID = 'ANSWER_INVALID';
export const ANSWER_VALID = 'ANSWER_VALID';
export const APP_LOADED = 'APP_LOADED';
export const SET_RESULT = 'SET_RESULT';
export const SHOW_RESULTS = 'SHOW_RESULTS';


export const incrementCounter = (value, incrementVal) => {
    return {
        type: INCREMENT,
        payload: value + incrementVal
    }
}

export const decrementCounter = (value, incrementVal) => {
    return {
        type: DECREMENT,
        payload: value - incrementVal
    }
}


export const resetCounter = () => {
    return {
        type: RESET,
        payload: 0
    }
    
}

export const setDataLength = (dataLength) => {
    return {
        type: SET_DATA_LENGTH,
        payload: dataLength
    }
}

export const setData = (data) => {
    return {
        type: SET_DATA,
        payload: data
    }
}

export const answerValid = () => {
    return {
        type: ANSWER_VALID,
        correctAnswer: 1
    }
}
export const answerInvalid = () => {
    return {
        type: ANSWER_INVALID,
        correctAnswer: 0
    }
}

export const appDidLoad = (val) => {
    return {
        type: APP_LOADED,
        payload: val
    }
}

export const setResult = (currentResult , val) => {
    return {
        type: SET_RESULT,
        payload: {currentResult: currentResult , val: val}
    }
}

export const endTrivia = (val) => {
    return {
        type: SHOW_RESULTS,
        payload: true
    }
}

export const setCurrentQuestion = (val) => {
    return {
        type: SET_CURRENT_QUESTION,
        currentCategory: val.category,
        currentCorrectAnswer: val.correct_answer,
        currentDifficulty: val.difficulty,
        currentQuestion: val.question
    }
}
export const INCREMENT = 'INCREMENT';
export const SET_DATA = 'SET_DATA';
export const SET_DATA_LENGTH = 'SET_DATA_LENGTH';
export const SET_CURRENT_QUESTION = 'SET_CURRENT_QUESTION';
export const ANSWER_INVALID = 'ANSWER_INVALID';
export const ANSWER_VALID = 'ANSWER_VALID';
export const APP_LOADED = 'APP_LOADED';
export const SET_RESULT = 'SET_RESULT';
export const SHOW_RESULTS = 'SHOW_RESULTS';
export const SET_TITLE = 'SET_TITLE';
export const START_TRIVIA = 'START_TRIVIA';


export const incrementCounter = (value, incrementVal) => {
    return {
        type: INCREMENT,
        payload: value + incrementVal
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

export const setResult = (currentResult , val, correctAnswer) => {
    return {
        type: SET_RESULT,
        payload: {currentResult: currentResult , val: val, correctAnswer: correctAnswer}
    }
}

export const endTrivia = (val) => {
    return {
        type: SHOW_RESULTS,
        payload: true
    }
}

export const setTitle = (val) => {
    return {
        type: SET_TITLE,
        payload: val
    }
}
export const startTrivia = (val) => {
    return {
        type: START_TRIVIA,
        payload: val
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
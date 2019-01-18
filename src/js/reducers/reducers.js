import {INCREMENT, DECREMENT, RESET, SET_DATA, SET_DATA_LENGTH, SET_CURRENT_QUESTION, ANSWER_INVALID , ANSWER_VALID, APP_LOADED, SET_RESULT, SHOW_RESULTS} from '../actions/actions';
import {combineReducers} from 'redux';

const initialState = {
    counterVal: 1,
    data: [],
    dataLength: 0,
    currentQuestion: null,
    currentCategory: null,
    currentDifficulty: null,
    currentUserAnswer: null,
    currentCorrectAnswer: null,
    questionAnswered: null,
    correctAnswers: 0,
    appLoaded: false,
    results: []
}

const counterVal = (state = initialState.counterVal , action) => {
    switch(action.type){
        case(INCREMENT):
            return action.payload
        case(DECREMENT):
            return action.payload
        case(RESET):
            return action.payload
        default: return state;
        }
}

export const data = (state = initialState.data , action) => {
    switch(action.type){
        case(SET_DATA):
            return action.payload;
        default: return state;
   }
}

export const appLoaded = (state = initialState.appLoaded , action) => {
    switch(action.type){
        case(APP_LOADED):
            return action.payload;
        default: return state;
     }
}

export const dataLength = (state = initialState.dataLength , action) => {
    switch(action.type){
        case(SET_DATA_LENGTH):
            return action.payload;
        default: return state;
   }
}

export const currentQuestion = (state = initialState.currentQuestion , action) => {
    switch(action.type){
        case(SET_CURRENT_QUESTION):
            return action.currentQuestion;
        default: return state;
   }
}
export const currentCategory = (state = initialState.currentCategory , action) => {
    switch(action.type){
        case(SET_CURRENT_QUESTION):
            return action.currentCategory;
        default: return state;
   }
}
export const currentCorrectAnswer = (state = initialState.currentCorrectAnswer , action) => {
    switch(action.type){
        case(SET_CURRENT_QUESTION):
            return action.currentCorrectAnswer;
        default: return state;
   }
}
export const correctAnswers = (state = initialState.correctAnswers , action) => {
    switch(action.type){
        case(ANSWER_VALID):
            return state + 1;
        case(ANSWER_INVALID):
            return state;
        default: return state;
   }
}
export const currentDifficulty = (state = initialState.currentDifficulty , action) => {
    switch(action.type){
        case(SET_CURRENT_QUESTION):
            return action.currentDifficulty;
        default: return state;
   }
}

export const results = (state = initialState.results , action) =>  {
    switch(action.type){
        case(SET_RESULT):
            return state.concat([action.payload]);
        default: return state;
    }
}

export const showResults = (state = false , action) => {
    switch(action.type){
    case(SHOW_RESULTS):
        return action.payload
    default: return state
    }
}

const rootReducer = combineReducers({
        counterVal,
        data,
        dataLength,
        currentQuestion,
        currentCategory,
        currentCorrectAnswer,
        currentDifficulty,
        correctAnswers,
        appLoaded,
        results,
        showResults
})

export default rootReducer;
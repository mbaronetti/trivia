import {createStore} from 'redux';
import rootReducer from '../reducers/reducers';
import freezeState from 'redux-freeze-state';

const store = createStore(freezeState(rootReducer));

export default store;
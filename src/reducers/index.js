import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import appReducer from './app';
import githubReducer from './github';

export default combineReducers({
    app: appReducer,
    routing: routerReducer,
    github: githubReducer
});
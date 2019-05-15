//import createStore and applyMiddleware
import{ createStore, applyMiddleware, compose} from 'redux';
//import Thunk
import thunk from 'redux-thunk';
import combineReducers from './reducers/index';

const initialState = {};

const middleware = [thunk];

const store = createStore(
    combineReducers,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
)

export default store;
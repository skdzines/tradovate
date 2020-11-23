import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import { action as viewAction, reducer as viewReducer } from './view';
import { action as columnAction, reducer as columnReducer, middleware as columnMiddleware } from './columns';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const action = {
    view: viewAction,
    columns: columnAction
};

const reducers = combineReducers({
    view: viewReducer,
    columns: columnReducer
});

export default createStore(reducers, composeEnhancers(
	applyMiddleware(
		...columnMiddleware
	)
));
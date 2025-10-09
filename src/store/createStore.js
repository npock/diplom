import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
//import { appReducer } from './appReducer';
import { thunk, withExtraArgument } from './thunk';
import {
	userReducer,
	usersReducer,
	postReducer,
	postsReducer,
} from './appReducers';
// import { thunk } from 'redux-thunk';

const appReducer = combineReducers({
	user: userReducer,
	//users: usersReducer,
	post: postReducer,
	//posts: postsReducer,
});

export const createStore = (navigate) => {
	// const store = legacy_createStore(
	// 	userReducer,
	// 	withExtraArgument({ navigate }),
	// );

	const store = legacy_createStore(appReducer, applyMiddleware(thunk));

	return store;
};

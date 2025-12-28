import {
	applyMiddleware,
	combineReducers,
	compose,
	legacy_createStore,
} from 'redux';
import { withExtraArgument } from './thunk';
import {
	authUserReducer,
	usersReducer,
	oneStuffReducer,
	stuffReducer,
	reviewsReducer,
} from './appReducers';

const appReducer = combineReducers({
	user: authUserReducer,
	users: usersReducer,
	oneStuff: oneStuffReducer,
	stuff: stuffReducer,
	reviews: reviewsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const createStore = (router) => {
	const store = legacy_createStore(
		appReducer,
		composeEnhancers(applyMiddleware(withExtraArgument({ router }))),
	);
	// store.subscribe(() => {
	// 	sessionStorage.setItem(
	// 		'user',
	// 		JSON.stringify(store.getState().user.authUser),
	// 	);
	// });
	return store;
};

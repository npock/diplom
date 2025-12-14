import {
	applyMiddleware,
	combineReducers,
	compose,
	legacy_createStore,
} from 'redux';
import { withExtraArgument } from './thunk';
import {
	userReducer,
	usersReducer,
	productReducer,
	productsReducer,
	rolesReducer,
} from './appReducers';

const appReducer = combineReducers({
	user: userReducer,
	users: usersReducer,
	product: productReducer,
	products: productsReducer,
	roles: rolesReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const createStore = (router) => {
	const store = legacy_createStore(
		appReducer,
		composeEnhancers(applyMiddleware(withExtraArgument({ router }))),
	);
	store.subscribe(() => {
		sessionStorage.setItem(
			'user',
			JSON.stringify(store.getState().user.authUser),
		);
	});
	return store;
};

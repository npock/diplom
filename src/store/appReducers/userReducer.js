import { ROLE } from '../../bff/constants/role';
import { server } from '../../bff/server';

const initialUserState = {
	authUser: {
		name: null,
		id: null,
		email: null,
		roleId: ROLE.GUEST,
		session: null,
	},
	isLoading: true,
	error: null,
};

// const authState = sessionStorage.getItem('user')
// 	? {
// 			authUser: JSON.parse(sessionStorage.getItem('user')),
// 			isLoading: false,
// 			error: null,
// 		}
// 	: initialUserState;
// console.log(JSON.parse(sessionStorage.getItem('user')));
// console.log(initialUserState);

export const userReducer = (state = initialUserState, { type, payload }) => {
	switch (type) {
		case 'SET_USER': {
			return {
				...state,
				...payload,
			};
		}
		case 'AUTH_USER_SUCCESS': {
			return {
				...state,
				...payload,
			};
		}
		case 'AUTH_USER_LOADING': {
			return {
				...state,
				isLoading: true,
			};
		}
		case 'AUTH_USER_ERROR': {
			return {
				...state,
				isLoading: false,
				error: payload,
			};
		}
		case 'LOGOUT':
			return initialUserState;

		default:
			return state;
	}
};

export const authUser = (payload) => async (dispatch, state, extra) => {
	dispatch({
		type: 'AUTH_USER_LOADING',
	});

	try {
		const response = await server.authorize(payload);
		console.log(response);

		if (response.error) {
			dispatch({ type: 'AUTH_USER_ERROR', payload: response.error });
			return;
		}
		dispatch({
			type: 'AUTH_USER_SUCCESS',
			payload: { authUser: response.res, isLoading: false },
		});

		extra.router.navigate('/');
	} catch (error) {
		console.log(error);
		dispatch({ type: 'AUTH_USER_ERROR', payload: 'something went wrong ' });
	}
};

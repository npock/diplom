const initialUserState = {
	authUser: {
		name: null,
		id: null,
		email: null,
	},
	isLoading: true,
	error: null,
};

export const authUserReducer = (
	state = initialUserState,
	{ type, payload },
) => {
	switch (type) {
		case 'REGISTER_SUCCESS': {
			return {
				...state,
				...payload,
			};
		}
		case 'REGISTER_LOADING': {
			return {
				...state,
				isLoading: true,
			};
		}
		case 'REGISTER_ERROR': {
			return {
				...state,
				isLoading: false,
				error: payload,
			};
		}

		case 'GET_ME_SUCCESS': {
			return {
				...state,
				...payload,
			};
		}
		case 'GET_ME_LOADING': {
			return {
				...state,
				isLoading: true,
			};
		}
		case 'GET_ME_ERROR': {
			return {
				...state,
				isLoading: false,
				error: payload,
			};
		}

		case 'LOGIN_SUCCESS': {
			return {
				...state,
				...payload,
			};
		}
		case 'LOGIN_LOADING': {
			return {
				...state,
				isLoading: true,
			};
		}
		case 'LOGIN_ERROR': {
			return {
				...state,
				isLoading: false,
				error: payload,
			};
		}

		case 'LOGOUT_SUCCESS': {
			return {
				...initialUserState,
				isLoading: false,
				error: null,
			};
		}
		case 'LOGOUT_LOADING': {
			return {
				...state,
				isLoading: true,
			};
		}
		case 'LOGOUT_ERROR': {
			return {
				...state,
				isLoading: false,
				error: payload,
			};
		}

		case 'UPDATE__USER__LOADING': {
			return {
				...state,
				isLoading: true,
				error: null,
			};
		}

		case 'UPDATE__USER__SUCCESS': {
			return {
				...state,
				isLoading: false,
				authUser: payload,
			};
		}
		case 'UPDATE__USER__ERROR': {
			return {
				...state,
				isLoading: false,
				error: payload,
			};
		}

		default:
			return state;
	}
};

export const register = (payload) => async (dispatch, state, extra) => {
	dispatch({
		type: 'REGISTER_LOADING',
	});

	try {
		const response = await fetch(
			'http://localhost:3005/api/v1/auth/register',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify(payload),
			},
		);
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		const { userData, message } = await response.json();
		console.log(message);
		dispatch({
			type: 'REGISTER_SUCCESS',
			payload: { authUser: userData, isLoading: false, error: null },
		});

		extra.router.navigate('/');
	} catch (error) {
		console.log(error);
		dispatch({ type: 'REGISTER_ERROR', payload: error.message });
	}
};

export const login = (payload) => async (dispatch, state, extra) => {
	dispatch({
		type: 'LOGIN_LOADING',
	});
	try {
		const response = await fetch(
			'http://localhost:3005/api/v1/auth/login',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',

				body: JSON.stringify(payload),
			},
		);
		if (!response.ok) {
			const errorData = await response.json();

			throw new Error(errorData.message);
		}
		const { userData, message } = await response.json();
		console.log(message);
		dispatch({
			type: 'LOGIN_SUCCESS',
			payload: { authUser: userData, isLoading: false, error: null },
		});
		extra.router.navigate('/');
	} catch (e) {
		console.log(e);
		dispatch({ type: 'LOGIN_ERROR', payload: e.message });
	}
};

export const logOut = () => async (dispatch) => {
	dispatch({
		type: 'LOGOUT_LOADING',
	});
	try {
		const response = await fetch(
			'http://localhost:3005/api/v1/auth/logout',
			{
				method: 'POST',
				credentials: 'include',
			},
		);
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		dispatch({
			type: 'LOGOUT_SUCCESS',
		});
	} catch (e) {
		console.log(e);
		dispatch({ type: 'LOGOUT_ERROR', payload: e.message });
	}
};

export const getMe = () => async (dispatch) => {
	dispatch({
		type: 'GET_ME_LOADING',
	});
	try {
		const response = await fetch('http://localhost:3005/api/v1/auth/me', {
			credentials: 'include',
		});
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		const { userData, message } = await response.json();
		console.log(message, userData);
		dispatch({
			type: 'GET_ME_SUCCESS',
			payload: { authUser: userData, isLoading: false, error: null },
		});
	} catch (e) {
		console.log(e);
		dispatch({ type: 'GET_ME_ERROR', payload: e.message });
	}
};

export const updateAuthUserAsync = (id, payload) => async (dispatch) => {
	dispatch({
		type: 'UPDATE_USER_LOADING',
	});
	try {
		const response = await fetch(
			`http://localhost:3005/api/v1/auth/${id}`,
			{
				method: 'PATCH',

				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
				credentials: 'include',
				body: JSON.stringify(payload),
			},
		);
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		const { userData, message } = await response.json();
		console.log(message, userData);
		dispatch({
			type: 'UPDATE_USER_SUCCESS',
			payload: userData,
		});
	} catch (e) {
		console.log(e);
		dispatch({ type: 'UPDATE_USER_ERROR', payload: e.message });
	}
};

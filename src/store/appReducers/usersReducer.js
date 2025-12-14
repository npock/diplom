const initialUserState = {
	isLoading: true,
	error: null,
	users: [],
	user: null,
};

export const usersReducer = (state = initialUserState, { type, payload }) => {
	switch (type) {
		case 'FETCH__USERS__SUCCESS': {
			return {
				...state,
				...payload,
			};
		}
		case 'FETCH__USERS__LOADING': {
			return {
				...state,
				isLoading: payload,
			};
		}
		case 'FETCH__USERS__ERROR': {
			return {
				...state,
				isLoading: false,
				error: payload,
			};
		}
		case 'FETCH__USER__SUCCESS': {
			return {
				...state,
				...payload,
			};
		}
		case 'FETCH__USER__LOADING': {
			return {
				...state,
				isLoading: payload,
			};
		}
		case 'FETCH__USER__ERROR': {
			return {
				...state,
				isLoading: false,
				error: payload,
			};
		}
		case 'UPDATE__USER__SUCCESS': {
			const index = state.users.findIndex(
				(user) => user.id === payload.id,
			);
			const newUsers = [...state.users];
			newUsers[index] = payload;

			return {
				...state,
				isLoading: false,
				users: newUsers,
			};
		}
		case 'UPDATE__USER__LOADING': {
			return {
				...state,
				isLoading: true,
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

export const fetchUsers = () => async (dispatch) => {
	dispatch({
		type: 'FETCH__USERS__LOADING',
		payload: true,
	});
	try {
		const response = await fetch('http://localhost:3000/users');
		if (!response.ok) {
			throw new Error('Something went wrong');
		}
		const data = await response.json();

		dispatch({
			type: 'FETCH__USERS__SUCCESS',
			payload: { users: data, isLoading: false },
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: 'FETCH__USERS__ERROR',
			payload: 'something went wrong in server',
		});
	}
};
export const getUserById = (id) => async (dispatch) => {
	dispatch({
		type: 'FETCH__USER__LOADING',
		payload: true,
	});
	try {
		const response = await fetch(`http://localhost:3000/users/${id}`);
		if (!response.ok) {
			throw new Error('Ошибка в запросе на сервер');
		}
		const data = await response.json();
		dispatch({
			type: 'FETCH__USER__SUCCESS',
			payload: { user: data, isLoading: false },
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: 'FETCH__USER__ERROR',
			payload: 'something went wrong in server',
		});
	}
};

export const updateRoleUserAsync = (id, payload) => async (dispatch) => {
	dispatch({
		type: 'UPDATE__USER__LOADING',
	});
	try {
		const response = await fetch(`http://localhost:3000/users/${id}`, {
			method: 'PUT',
			body: JSON.stringify({ ...payload }),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		});
		if (!response.ok) {
			throw new Error('Something went wrong');
		}
		const data = await response.json();
		dispatch({
			type: 'UPDATE__USER__SUCCESS',
			payload: data,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: 'UPDATE__USER__ERROR',
			payload: 'ошибка в запросе на сервер при изменении user',
		});
	}
};

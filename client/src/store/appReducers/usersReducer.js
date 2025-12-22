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
				(user) => user._id === payload._id,
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
		case 'DELETE__USER__SUCCESS': {
			const newUsers = state.users.filter((user) => user._id !== payload);

			return {
				...state,
				isLoading: false,
				error: null,
				users: newUsers,
			};
		}
		case 'DELETE__USER__LOADING': {
			return {
				...state,
				isLoading: true,
			};
		}
		case 'DELETE__USER__ERROR': {
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
		const response = await fetch(
			'http://localhost:3005/api/v1/users/users',
			{
				credentials: 'include',
			},
		);
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		const { userData, message } = await response.json();
		console.log(message);
		dispatch({
			type: 'FETCH__USERS__SUCCESS',
			payload: { users: userData, isLoading: false },
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: 'FETCH__USERS__ERROR',
			payload: error.message,
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
			throw new Error(response.statusText);
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
		const response = await fetch(
			`http://localhost:3005/api/v1/users/${id}`,
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
		console.log(message);
		dispatch({
			type: 'UPDATE__USER__SUCCESS',
			payload: userData,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: 'UPDATE__USER__ERROR',
			payload: 'ошибка в запросе на сервер при изменении user',
		});
	}
};

export const deleteUser = (id) => async (dispatch) => {
	dispatch({
		type: 'DELETE__USER__LOADING',
	});
	try {
		const response = await fetch(
			`http://localhost:3005/api/v1/users/${id}`,
			{
				method: 'DELETE',

				credentials: 'include',
			},
		);
		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message);
		}
		dispatch({
			type: 'DELETE__USER__SUCCESS',
			payload: id,
		});
	} catch (error) {
		console.log('deleteError', error);
		dispatch({
			type: 'DELETE__USER__ERROR',
			payload: 'delete Error server',
		});
	}
};

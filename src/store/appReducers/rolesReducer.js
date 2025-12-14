const initialRolesState = {
	roles: [],
	isLoading: true,
	error: null,
};

export const rolesReducer = (state = initialRolesState, { type, payload }) => {
	switch (type) {
		case 'FETCH__ROLES__SUCCESS': {
			return {
				...state,
				...payload,
			};
		}
		case 'FETCH__ROLES__LOADING': {
			return {
				...state,
				isLoading: payload,
			};
		}
		case 'FETCH__ROLES__ERROR': {
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

export const fetchRoles = () => async (dispatch) => {
	dispatch({
		type: 'FETCH__ROLES__LOADING',
		payload: true,
	});
	try {
		const response = await fetch('http://localhost:3000/roles');
		if (!response.ok) {
			throw new Error('Something went wrong');
		}
		const data = await response.json();

		dispatch({
			type: 'FETCH__ROLES__SUCCESS',
			payload: { roles: data, isLoading: false },
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: 'FETCH__ROLES__ERROR',
			payload: 'smth went wrong',
		});
	}
};

export const getRoleById = (roles, findid) =>
	roles.filter(({ id }) => id === findid)[0]?.name;

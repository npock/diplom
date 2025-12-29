const initialPostState = { isLoading: true, error: null, oneStuff: {} };

export const oneStuffReducer = (
	state = initialPostState,
	{ type, payload },
) => {
	switch (type) {
		case 'FETCH__ONESTUFF__SUCCESS': {
			return {
				...state,
				oneStuff: { ...payload },
				isLoading: false,
			};
		}
		case 'FETCH__ONESTUFF__LOADING': {
			return {
				...state,
				isLoading: true,
			};
		}
		case 'FETCH__ONESTUFF__ERROR': {
			return {
				...state,
				isLoading: false,
				error: payload,
			};
		}
		default: {
			return state;
		}
	}
};

export const fetchOneStuff = (id) => async (dispatch) => {
	dispatch({
		type: 'FETCH__ONESTUFF__LOADING',
	});
	try {
		const response = await fetch(`/api/v1/stuff/${id}`, {
			credentials: 'include',
		});
		if (!response.ok) {
			throw new Error('Something went wrong');
		}
		const { data, message } = await response.json();
		console.log(message);
		dispatch({
			type: 'FETCH__ONESTUFF__SUCCESS',
			payload: data,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: 'FETCH__ONESTUFF__ERROR',
			payload: 'something went wrong in server',
		});
	}
};

const initialUserState = {
	isLoading: true,
	error: null,
	stuff: [],
	productsInBasket: [],
};

export const stuffReducer = (state = initialUserState, { type, payload }) => {
	switch (type) {
		case 'FETCH_STUFFS_SUCCESS': {
			return {
				...state,
				...payload,
				isLoading: false,
				error: null,
			};
		}
		case 'FETCH_STUFFS_LOADING': {
			return {
				...state,
				isLoading: true,
				error: null,
			};
		}
		case 'FETCH_STUFFS_ERROR': {
			return {
				...state,
				isLoading: false,
				error: payload,
			};
		}
		case 'FETCH__STUFF__BYID__SUCCESS': {
			return {
				...state,
				...payload,
				isLoading: false,
				error: null,
			};
		}
		case 'FETCH__STUFF__BYID__LOADING': {
			return {
				...state,
				isLoading: true,
				error: null,
			};
		}
		case 'FETCH__STUFF__BYID__ERROR': {
			return {
				...state,
				isLoading: false,
				error: payload,
			};
		}
		case 'UPDATE__STUFF__SUCCESS': {
			const index = state.stuff.findIndex(
				(product) => product.id === payload.id,
			);
			const newProducts = [...state.stuff];
			newProducts[index] = payload;

			return {
				...state,
				isLoading: false,
				products: newProducts,
			};
		}
		case 'UPDATE__STUFF__LOADING': {
			return {
				...state,
				isLoading: true,
				error: null,
			};
		}
		case 'UPDATE__STUFF__ERROR': {
			return {
				...state,
				isLoading: false,
				error: payload,
			};
		}
		case 'REMOVE_PRODUCT': {
			return {
				...state,
				...payload,
			};
		}

		case 'CREATE_STUFF_LOADING':
			return {
				...state,
				isLoading: true,
				error: null,
			};

		case 'CREATE_STUFF_SUCCESS':
			return {
				...state,
				isLoading: false,
				stuff: [...state.stuff, payload],
				error: null,
			};

		case 'CREATE_STUFF_ERROR':
			return {
				...state,
				isLoading: false,
				error: payload,
			};
		case 'DELETE__STUFF__SUCCESS': {
			const newStuff = state.stuff.filter(
				(stuff) => stuff._id !== payload,
			);

			return {
				...state,
				isLoading: false,
				error: null,
				stuff: newStuff,
			};
		}
		case 'DELETE__STUFF__LOADING': {
			return {
				...state,
				isLoading: true,
			};
		}
		case 'DELETE__STUFF__ERROR': {
			return {
				...state,
				isLoading: false,
				error: payload,
			};
		}

		case 'ISLOADING_FALSE':
			return {
				...state,
				isLoading: false,
			};

		default:
			return state;
	}
};

export const fetchStuff =
	(params = {}) =>
	async (dispatch) => {
		dispatch({ type: 'FETCH_STUFFS_LOADING' });

		const queryString = new URLSearchParams({
			page: params.page || 1,
			limit: 8,
			search: params.search || '',
			sort: params.sort || '',
		}).toString();

		try {
			const response = await fetch(
				`http://localhost:3005/api/v1/stuff?${queryString}`,
			);
			const { data, message } = await response.json();
			console.log(message, data);
			dispatch({ type: 'FETCH_STUFFS_SUCCESS', payload: data });
		} catch (e) {
			dispatch({ type: 'FETCH_STUFFS_ERROR', payload: e.message });
		}
	};

export const fetchStuffByIds = (stuff) => async (dispatch) => {
	dispatch({
		type: 'FETCH__STUFF__BYID__LOADING',
	});
	try {
		const response = await fetch('http://localhost:3005/api/v1/stuff/', {
			credentials: 'include',
		});
		if (!response.ok) {
			throw new Error('Something went wrong');
		}
		const { data } = await response.json();
		const filterData = stuff.map((item) => {
			return {
				...data.stuff.filter((i) => i._id === item.id)[0],
				quantity: item.quantity,
			};
		});
		dispatch({
			type: 'FETCH__STUFF__BYID__SUCCESS',
			payload: { productsInBasket: filterData },
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: 'FETCH__STUFF__BYID__ERROR',
			payload: 'something went wrong in server',
		});
	}
};

export const updateStuffAsync =
	(id, payload) => async (dispatch, state, extra) => {
		dispatch({
			type: 'UPDATE__STUFF__LOADING',
		});
		try {
			const response = await fetch(
				`http://localhost:3005/api/v1/stuff/${id}`,
				{
					method: 'PATCH',
					body: JSON.stringify({ ...payload }),
					credentials: 'include',
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
					},
				},
			);
			if (!response.ok) {
				throw new Error('Something went wrong');
			}
			const { data, message } = await response.json();
			console.log(message);
			dispatch({
				type: 'UPDATE__STUFF__SUCCESS',
				payload: data,
			});
			extra.router.navigate(`/stuff/${id}`);
		} catch (error) {
			console.log(error);
			dispatch({
				type: 'UPDATE__STUFF__ERROR',
				payload: 'ошибка в запросе на сервер при изменении user',
			});
		}
	};

export const addStuffAsync = (stuffData) => async (dispatch, state, extra) => {
	dispatch({ type: 'CREATE_STUFF_LOADING' });
	try {
		const response = await fetch('http://localhost:3005/api/v1/stuff', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(stuffData),
			credentials: 'include',
		});

		if (!response.ok) throw new Error('Ошибка доступа или сервера');

		const { data, message } = await response.json();
		console.log(message);
		dispatch({ type: 'CREATE_STUFF_SUCCESS', payload: data });
		extra.router.navigate('/');
	} catch (e) {
		dispatch({ type: 'CREATE_STUFF_ERROR', payload: e.message });
		return false;
	}
};

export const deleteStuffAsync = (id) => async (dispatch, state, extra) => {
	dispatch({
		type: 'DELETE__STUFF__LOADING',
	});
	try {
		const response = await fetch(
			`http://localhost:3005/api/v1/stuff/${id}`,
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
			type: 'DELETE__STUFF__SUCCESS',
			payload: id,
		});
		extra.router.navigate('/');
	} catch (error) {
		console.log('deleteError', error);
		dispatch({
			type: 'DELETE__STUFF__ERROR',
			payload: 'delete Error server',
		});
	}
};

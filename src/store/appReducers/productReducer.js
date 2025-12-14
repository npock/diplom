const initialPostState = { isLoading: true, error: null, product: null };

export const productReducer = (state = initialPostState, { type, payload }) => {
	switch (type) {
		case 'FETCH__PRODUCT__SUCCESS': {
			return {
				...state,
				...payload,
			};
		}
		case 'FETCH__PRODUCT__LOADING': {
			return {
				...state,
				isLoading: true,
			};
		}
		case 'FETCH__PRODUCT__ERROR': {
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

export const fetchProduct = (id) => async (dispatch) => {
	dispatch({
		type: 'FETCH__PRODUCT__LOADING',
	});
	try {
		const response = await fetch(`http://localhost:3000/products/${id}`);
		if (!response.ok) {
			throw new Error('Something went wrong');
		}
		const data = await response.json();

		dispatch({
			type: 'FETCH__PRODUCT__SUCCESS',
			payload: { product: data, isLoading: false },
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: 'FETCH__PRODUCT__ERROR',
			payload: 'something went wrong in server',
		});
	}
};

const initialUserState = {
	isLoading: true,
	error: null,
	products: [],
	productsInBasket: [],
};

export const productsReducer = (
	state = initialUserState,
	{ type, payload },
) => {
	switch (type) {
		case 'FETCH__PRODUCTS__SUCCESS': {
			return {
				...state,
				...payload,
			};
		}
		case 'FETCH__PRODUCTS__LOADING': {
			return {
				...state,
				isLoading: payload,
			};
		}
		case 'FETCH__PRODUCTS__ERROR': {
			return {
				...state,
				isLoading: false,
				error: payload,
			};
		}
		case 'UPDATE__PRODUCTS__SUCCESS': {
			const index = state.products.findIndex(
				(product) => product.id === payload.id,
			);
			const newProducts = [...state.users];
			newProducts[index] = payload;

			return {
				...state,
				isLoading: false,
				products: newProducts,
			};
		}
		case 'UPDATE__PRODUCTS__LOADING': {
			return {
				...state,
				isLoading: true,
			};
		}
		case 'UPDATE__PRODUCTS__ERROR': {
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
		default:
			return state;
	}
};

export const fetchProducts = () => async (dispatch) => {
	dispatch({
		type: 'FETCH__PRODUCTS__LOADING',
		payload: true,
	});
	try {
		const response = await fetch('http://localhost:3000/products');
		if (!response.ok) {
			throw new Error('Something went wrong');
		}
		const data = await response.json();

		dispatch({
			type: 'FETCH__PRODUCTS__SUCCESS',
			payload: { products: data, isLoading: false },
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: 'FETCH__PRODUCTS__ERROR',
			payload: 'something went wrong in server',
		});
	}
};

export const fetchProductsByIds = (stuff) => async (dispatch) => {
	dispatch({
		type: 'FETCH__PRODUCTS__LOADING',
		payload: true,
	});
	try {
		const response = await fetch('http://localhost:3000/products');
		if (!response.ok) {
			throw new Error('Something went wrong');
		}
		const data = await response.json();

		// const filterData = data.filter((item) =>
		// 	stuff.map((item) => item.id).includes(item.id)
		// );

		const filterData = stuff.map((item) => {
			return {
				...data.filter((i) => i.id === item.id)[0],
				quantity: item.quantity,
			};
		});

		dispatch({
			type: 'FETCH__PRODUCTS__SUCCESS',
			payload: { productsInBasket: filterData, isLoading: false },
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: 'FETCH__PRODUCTS__ERROR',
			payload: 'something went wrong in server',
		});
	}
};

export const updateProductAsync = (id, payload) => async (dispatch) => {
	dispatch({
		type: 'UPDATE__PRODUCTS__LOADING',
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
			type: 'UPDATE__PRODUCTS__SUCCESS',
			payload: data,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: 'UPDATE__PRODUCTS__ERROR',
			payload: 'ошибка в запросе на сервер при изменении user',
		});
	}
};

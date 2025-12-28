const initialReviewState = {
	reviews: [],
	isLoading: true,
	error: null,
};

export const reviewsReducer = (
	state = initialReviewState,
	{ type, payload },
) => {
	switch (type) {
		case 'FETCH_REVIEWS_SUCCESS': {
			return {
				...state,
				reviews: payload,
				error: null,
				isLoading: false,
			};
		}
		case 'FETCH_REVIEWS_LOADING': {
			return {
				...state,
				isLoading: true,
			};
		}
		case 'FETCH_REVIEWS_ERROR': {
			return {
				...state,
				isLoading: false,
				error: payload,
			};
		}

		case 'ADD_REVIEW_LOADING':
			return {
				...state,
				isLoading: true,
				error: null,
			};

		case 'ADD_REVIEW_SUCCESS':
			return {
				...state,
				isLoading: false,
				reviews: [...state.reviews, payload],
				error: null,
			};

		case 'ADD_REVIEW_ERROR':
			return {
				...state,
				isLoading: false,
				error: payload,
			};
		case 'REMOVE_REVIEW_ISLOADING':
			return {
				...state,
				isLoading: true,
				error: null,
			};
		case 'REMOVE_REVIEW_SUCCESS':
			return {
				...state,
				reviews: state.reviews.filter((rev) => rev._id !== payload),
			};
		case 'REMOVE_REVIEW_ERROR':
			return {
				...state,
				isLoading: false,
				error: payload,
			};
		case 'UPDATE_REVIEW_ISLOADING':
			return {
				...state,
				isLoading: true,
				error: null,
			};
		case 'UPDATE_REVIEW_SUCCESS':
			return {
				...state,
				reviews: state.reviews.map((rev) =>
					rev._id === payload._id ? payload : rev,
				),
				isLoading: false,
				error: null,
			};
		case 'UPDATE_REVIEW_ERROR':
			return {
				...state,
				isLoading: false,
				error: payload,
			};
		case 'FETCH_MY_REVIEWS_SUCCESS': {
			return {
				...state,
				reviews: payload,
				error: null,
				isLoading: false,
			};
		}
		case 'FETCH_MY_REVIEWS_LOADING': {
			return {
				...state,
				isLoading: true,
			};
		}
		case 'FETCH_MY_REVIEWS_ERROR': {
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

export const addReviewAsync = (stuffId, reviewData) => async (dispatch) => {
	dispatch({ type: 'ADD_REVIEW_LOADING' });

	try {
		const response = await fetch(
			`http://localhost:3005/api/v1/stuff/${stuffId}/reviews`,
			{
				method: 'POST',
				body: JSON.stringify(reviewData),
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
			},
		);
		const { data, message } = await response.json();
		console.log(message);
		if (response.ok) {
			dispatch({ type: 'ADD_REVIEW_SUCCESS', payload: data });
		}
	} catch (e) {
		console.error(e);
		dispatch({ type: 'ADD_REVIEW_ERROR' });
	}
};

export const fetchReviews = (stuffId) => async (dispatch) => {
	dispatch({ type: 'FETCH_REVIEWS_LOADING' });
	try {
		const response = await fetch(
			`http://localhost:3005/api/v1/stuff/${stuffId}/reviews`,
		);
		const { data, message } = await response.json();
		console.log(message);

		dispatch({ type: 'FETCH_REVIEWS_SUCCESS', payload: data });
	} catch (e) {
		dispatch({ type: 'FETCH_REVIEWS_ERROR', payload: e.message });
	}
};

export const removeReview = (reviewId) => async (dispatch) => {
	if (!window.confirm('Удалить отзыв?')) return;
	dispatch({ type: 'REMOVE_REVIEW_ISLOADING' });
	try {
		const response = await fetch(
			`http://localhost:3005/api/v1/reviews/${reviewId}`,
			{
				method: 'DELETE',
				credentials: 'include',
			},
		);
		const { message } = await response.json();
		console.log(message);
		dispatch({ type: 'REMOVE_REVIEW_SUCCESS', payload: reviewId });
	} catch (e) {
		console.error(e);
		dispatch({ type: 'REMOVE_REVIEW_ERROR' });
	}
};

export const updateReview = (reviewId, updateData) => async (dispatch) => {
	dispatch({ type: 'UPDATE_REVIEW_ISLOADING' });

	try {
		const response = await fetch(
			`http://localhost:3005/api/v1/reviews/${reviewId}`,
			{
				method: 'PATCH',
				body: JSON.stringify(updateData),
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
			},
		);
		const { data, message } = await response.json();
		console.log(message);
		dispatch({ type: 'UPDATE_REVIEW_SUCCESS', payload: data });
	} catch (e) {
		console.error(e);
		dispatch({ type: 'UPDATE_REVIEW_ERROR' });
	}
};

export const fetchMyReviews = () => async (dispatch) => {
	dispatch({ type: 'FETCH_MY_REVIEWS_LOADING' });
	try {
		const response = await fetch(
			'http://localhost:3005/api/v1/reviews/my-reviews',
			{
				credentials: 'include',
			},
		);
		const { data, message } = await response.json();
		console.log(message);
		dispatch({ type: 'FETCH_MY_REVIEWS_SUCCESS', payload: data });
	} catch (e) {
		dispatch({ type: 'REVIEW_ERROR', payload: e.message });
	}
};

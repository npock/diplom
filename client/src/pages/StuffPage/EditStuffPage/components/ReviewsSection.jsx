import { useEffect, useState } from 'react';
import { TextArea } from '../../../../components/TextArea/TexrArea';
import { useDispatch, useSelector } from 'react-redux';
import { SelectField } from '../../../../components/SelectField/SelectField';
import { validator } from '../../../utils/validator';
import { addReviewAsync, fetchReviews } from '../../../../store/appReducers';
import { Button } from '../../../../components/Button/Button';
import style from './Reviews.module.css';
import { Review } from './Review/Review';

export const ReviewsSection = ({ stuffId }) => {
	const [form, setForm] = useState({
		text: '',
		rating: '5',
	});
	const [visibleCount, setVisibleCount] = useState(3);
	const [error, setError] = useState({});

	const options = [
		{ value: 5, label: '5 ★' },
		{ value: 4, label: '4 ★' },
		{ value: 3, label: '3 ★' },
		{ value: 2, label: '2 ★' },
		{ value: 1, label: '1 ★' },
	];

	const reviews = useSelector((state) => state.reviews.reviews || []);
	const authUser = useSelector((state) => state.user.authUser);
	const dispatch = useDispatch();

	const slicedReviews = reviews.slice(0, visibleCount);

	const showMore = () => {
		setVisibleCount((prev) => prev + 3);
	};

	const reviewSchema = {
		text: {
			isRequired: { message: 'Обязательное поле' },
		},
		rating: {
			isRequired: { message: 'Обязательное поле' },
		},
	};

	const validate = (data) => {
		const error = validator(data, reviewSchema);
		setError(error);
		return Object.keys(error).length === 0;
	};

	const isValid = Object.keys(error).length === 0;

	const handleChange = (event) => {
		const { name, value } = event.target;
		setForm({ ...form, [name]: value });
		validate({ ...form, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const isValid = validate(form);
		if (!isValid) return;
		dispatch(addReviewAsync(stuffId, form));
		setForm({ text: '', rating: '' });
	};

	useEffect(() => {
		dispatch(fetchReviews(stuffId));
	}, [dispatch, stuffId]);

	return (
		<div className={style.container}>
			<h3 className={style.title}>Отзывы</h3>

			{authUser ? (
				<form className={style.reviewForm} onSubmit={handleSubmit}>
					<TextArea
						name="text"
						value={form.text}
						onChange={handleChange}
						error={error?.text}
						placeholder="ваш отзыв..."
					/>
					<SelectField
						name="rating"
						error={error?.rating}
						onChange={handleChange}
						value={form.rating}
						options={options}
					/>

					<Button type="submit" disabled={!isValid}>
						Отправить
					</Button>
				</form>
			) : (
				<p>Войдите, чтобы оставить отзыв</p>
			)}

			<div className={style.list}>
				{slicedReviews.length > 0 ? (
					slicedReviews.map((rev) => (
						<div key={rev._id} className={style.reviewCard}>
							<Review rev={rev} reviews={reviews}></Review>
						</div>
					))
				) : (
					<p className={style.noReviews}>Отзывов пока нет</p>
				)}
				{reviews.length > visibleCount && (
					<Button className={style.showMoreBtn} onClick={showMore}>
						Показать еще ({reviews.length - visibleCount})
					</Button>
				)}
				{visibleCount > 3 && reviews.length > 3 && (
					<Button
						className={style.hideBtn}
						onClick={() => setVisibleCount(3)}
					>
						Свернуть
					</Button>
				)}
			</div>
		</div>
	);
};

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import s from './MyReviews.module.css';
import {
	fetchMyReviews,
	removeReview,
	updateReview,
} from '../../../store/appReducers';

export const MyReviews = () => {
	const [editingId, setEditingId] = useState(null);
	const [editText, setEditText] = useState('');
	const [editRating, setEditRating] = useState(5);

	const isLoading = useSelector((state) => state.reviews.isLoading);
	const reviews = useSelector((state) => state.reviews.reviews || []);
	const error = useSelector((state) => state.reviews.error);

	const dispatch = useDispatch();

	const handleEditStart = (rev) => {
		setEditingId(rev._id);
		setEditText(rev.text);
		setEditRating(rev.rating);
	};

	const handleSave = (id) => {
		dispatch(updateReview(id, { text: editText, rating: editRating }));
		setEditingId(null);
	};
	useEffect(() => {
		dispatch(fetchMyReviews());
	}, [dispatch]);

	if (isLoading) {
		return <div className={s.loader}>Загрузка ваших отзывов...</div>;
	}

	if (error) {
		return <div>error...</div>;
	}

	return (
		<div className={s.container}>
			<h1>Мои отзывы</h1>

			{reviews.length === 0 ? (
				<p>Вы еще не оставили ни одного отзыва.</p>
			) : (
				<div className={s.list}>
					{reviews.map((rev) => (
						<div key={rev._id} className={s.card}>
							<div className={s.header}>
								<Link
									to={`/stuff/${rev.stuffId?._id}`}
									className={s.stuffLink}
								>
									Товар:{' '}
									{rev?.stuffId.name || 'Удаленный товар'}
								</Link>
								<span className={s.date}>
									{new Date(
										rev.createdAt,
									).toLocaleDateString()}
								</span>
							</div>

							{editingId === rev._id ? (
								<div className={s.editBlock}>
									<textarea
										className={s.textarea}
										value={editText}
										onChange={(e) =>
											setEditText(e.target.value)
										}
									/>
									<select
										value={editRating}
										onChange={(e) =>
											setEditRating(
												Number(e.target.value),
											)
										}
									>
										{[1, 2, 3, 4, 5].map((n) => (
											<option key={n} value={n}>
												{n} ★
											</option>
										))}
									</select>
									<div className={s.editActions}>
										<button
											onClick={() => handleSave(rev._id)}
											className={s.saveBtn}
										>
											Сохранить
										</button>
										<button
											onClick={() => setEditingId(null)}
											className={s.cancelBtn}
										>
											Отмена
										</button>
									</div>
								</div>
							) : (
								<>
									<div className={s.stars}>
										{'★'.repeat(rev.rating)}
										{'☆'.repeat(5 - rev.rating)}
									</div>
									<p className={s.text}>{rev.text}</p>
									<div className={s.actions}>
										<button
											onClick={() => handleEditStart(rev)}
											className={s.editBtn}
										>
											Изменить
										</button>

										<button
											className={s.deleteBtn}
											onClick={() =>
												dispatch(removeReview(rev._id))
											}
										>
											Удалить отзыв
										</button>
									</div>
								</>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

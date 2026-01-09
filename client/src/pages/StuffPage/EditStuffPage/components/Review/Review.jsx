import { useState } from 'react';
import style from '../Reviews.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { removeReview, updateReview } from '../../../../../store/appReducers';
import { TextArea } from '../../../../../components/TextArea/TexrArea';

export const Review = ({ rev }) => {
	const [editingId, setEditingId] = useState(null);
	const [text, setText] = useState(null);
	const authUser = useSelector((state) => state.user.authUser);

	const dispatch = useDispatch();

	const handleEditStart = (rev) => {
		setEditingId(rev._id);
		setText(rev.text);
	};

	const handleChange = (e) => {
		setText(e.target.value);
	};

	const handleUpdate = (id) => {
		dispatch(updateReview(id, { text: text }));
		setEditingId(null);
	};

	const removeReviewRed = (rev) => {
		dispatch(removeReview(rev._id));
	};
	const renderStars = (rating) => {
		return '★'.repeat(rating) + '☆'.repeat(5 - rating);
	};
	return (
		<>
			{editingId === rev._id ? (
				<>
					<TextArea
						name="text"
						value={text}
						onChange={handleChange}
						placeholder="ваш отзыв..."
						required
					/>
					<button
						className={style.submitBtn}
						onClick={() => handleUpdate(rev._id)}
					>
						Сохранить
					</button>
					<button
						className={style.cancelBtn}
						onClick={() => setEditingId(null)}
					>
						Отмена
					</button>
				</>
			) : (
				<>
					<div>
						<div className={style.header}>
							<span className={style.author}>
								👤 {rev.author?.name}
							</span>

							<span className={style.date}>
								{rev.createdAt &&
									new Date(
										rev.createdAt,
									).toLocaleDateString()}
							</span>
						</div>
						<div className={style.stars}>
							{renderStars(rev.rating)}
						</div>
						<p className={style.text}>{rev.text}</p>
					</div>
					{(authUser?._id === rev.author?._id ||
						authUser?.role === 'admin') && (
						<div className={style.actions}>
							<button
								className={style.editBtn}
								onClick={() => handleEditStart(rev)}
							>
								изменить
							</button>
							<button
								className={style.deleteBtn}
								onClick={() => removeReviewRed(rev)}
							>
								удалить
							</button>
						</div>
					)}
				</>
			)}
		</>
	);
};

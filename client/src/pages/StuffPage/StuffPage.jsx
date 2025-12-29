import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import style from './StuffPage.module.css';
import { fetchOneStuff } from '../../store/appReducers';
import { ReviewsSection } from './EditStuffPage/components/ReviewsSection';

export const StuffPage = () => {
	const { id } = useParams();

	const dispatch = useDispatch();
	const authUser = useSelector((state) => state.user.authUser);
	const stuff = useSelector((state) => state.oneStuff.oneStuff);
	const error = useSelector((state) => state.oneStuff.error);
	const isLoading = useSelector((state) => state.oneStuff.isLoading);

	const addToBasket = (idStuff) => {
		const currentStuffString = localStorage.getItem('stuff');

		let currentStuff = [];

		if (currentStuffString) {
			try {
				currentStuff = JSON.parse(currentStuffString);
				if (!Array.isArray(currentStuff)) {
					currentStuff = [];
				}
			} catch (error) {
				console.error("Ошибка парсинга localStorage 'stuff':", error);
				currentStuff = [];
			}
		}
		const sumOfIds = currentStuff.filter(
			(stuff) => stuff.id === idStuff,
		).length;
		if (sumOfIds === 0) {
			currentStuff.push({ id: idStuff, quantity: 1 });
			localStorage.setItem('stuff', JSON.stringify(currentStuff));
		} else {
			const finalStuff = currentStuff.map((stuff) => {
				if (stuff.id === idStuff) {
					stuff.quantity = stuff.quantity + 1;
				}

				return stuff;
			});
			localStorage.setItem('stuff', JSON.stringify(finalStuff));
		}
	};

	useEffect(() => {
		dispatch(fetchOneStuff(id));
	}, [id, dispatch]);

	if (isLoading)
		return (
			<div className={style.container}>
				<span>...loading</span>
			</div>
		);
	if (error || !stuff)
		return (
			<div className={style.container}>
				<span>smth went wrong</span>
			</div>
		);

	return (
		<div className={style.container}>
			<div className={style.imageWrapper}>
				<img
					src={stuff.image_url}
					alt={stuff.name}
					className={style.image}
				/>
			</div>

			<div className={style.infoSection}>
				<h1 className={style.title}>{stuff.name}</h1>
				<p className={style.price}>{stuff.price} ₽</p>
				<p className={style.description}>{stuff.description}</p>
				<p className={style.date}>
					Добавлено:{' '}
					{new Date(stuff.createdAt).toLocaleDateString('ru-RU')}
				</p>

				<button
					className={style.basketBtn}
					onClick={() => addToBasket(id)}
				>
					🛒 В корзину
				</button>

				{authUser &&
				((authUser.role === 'moderator' &&
					stuff.author === authUser._id) ||
					authUser.role === 'admin') ? (
					<Link
						to={`/stuff/${stuff._id}/edit`}
						className={style.editLink}
					>
						⚙️ Редактировать товар
					</Link>
				) : null}
			</div>

			<div style={{ gridColumn: '1 / -1', marginTop: '40px' }}>
				<ReviewsSection stuffId={id} />
			</div>
		</div>
	);
};

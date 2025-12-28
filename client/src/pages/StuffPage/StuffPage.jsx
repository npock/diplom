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

	if (isLoading) {
		return <span>...loading</span>;
	}
	if (error) {
		return <span>smth went wrong</span>;
	}

	return (
		<div className={style.container}>
			<p className=""> Название товара: {stuff?.name}</p>
			<img src={stuff.image_url} />
			<p className="">цена: {stuff?.price}</p>
			<p className="">Описание: {stuff?.description}</p>
			<p className=""> Дата добавления : {stuff?.createdAt}</p>
			<button onClick={() => addToBasket(id)}>В корзину</button>

			<ReviewsSection stuffId={id} />

			{(authUser.role === 'moderator' && stuff.author === id) ||
			authUser.role === 'admin' ? (
				<Link to={`/stuff/${stuff._id}/edit`}>Edit</Link>
			) : null}
		</div>
	);
};

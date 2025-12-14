import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../store/appReducers';
import style from './ProductPage.module.css';

export const ProductPage = () => {
	const { id } = useParams();

	const dispatch = useDispatch();

	const product = useSelector((state) => state.product.product);
	const error = useSelector((state) => state.product.error);
	const isLoading = useSelector((state) => state.product.isLoading);

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
		dispatch(fetchProduct(id));
	}, [id, dispatch]);

	if (isLoading) {
		return <span>...loading</span>;
	}
	if (error) {
		return <span>smth went wrong</span>;
	}

	return (
		<div className={style.container}>
			<p className=""> Название товара: {product?.title}</p>
			<img src={product.image_url} />
			<p className="">Описание: {product?.description}</p>
			<p className=""> Дата добавления : {product?.published_at}</p>
			<button onClick={() => addToBasket(id)}>В корзину</button>
		</div>
	);
};

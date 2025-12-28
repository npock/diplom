import React, { useEffect } from 'react';
import './Basket.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStuffByIds } from '../../store/appReducers';

export const Basket = () => {
	const stuff = JSON.parse(localStorage.getItem('stuff'));
	const productsInBasket = useSelector(
		(state) => state.stuff.productsInBasket,
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchStuffByIds(stuff));
	}, [dispatch]);

	const finalPrice = productsInBasket.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);

	const updateBasket = (updatedItems) => {
		const forStorage = updatedItems.map((item) => ({
			id: item._id || item.id,
			quantity: item.quantity,
		}));
		localStorage.setItem('stuff', JSON.stringify(forStorage));

		dispatch(fetchStuffByIds(forStorage));
	};

	const handleRemoveItem = (itemId) => {
		const newProducts = productsInBasket
			.filter((item) => item._id !== itemId)
			.map((item) => ({
				id: item._id,
				quantity: item.quantity,
			}));
		localStorage.setItem('stuff', JSON.stringify(newProducts));
		updateBasket(newProducts);
	};

	const handleQuantityChange = (itemId, change) => {
		const newProducts = productsInBasket.map((item) => {
			if (item._id === itemId) {
				const newQuantity = item.quantity + change;
				return { id: item._id, quantity: Math.max(1, newQuantity) };
			}
			return { id: item._id, quantity: item.quantity };
		});

		localStorage.setItem('stuff', JSON.stringify(newProducts));
		updateBasket(newProducts);
	};

	if (productsInBasket.length === 0) {
		return (
			<div className="cart-container empty-cart">
				<h1>Ваша корзина пуста</h1>
				<p>Добавьте товары, чтобы увидеть их здесь.</p>
			</div>
		);
	}

	return (
		<div className="cart-container">
			<h1>Ваша корзина</h1>
			<div className="cart-items-list">
				{productsInBasket.map((item) => (
					<div key={item._id} className="cart-item">
						<div className="item-details">
							<h3>{item.name}</h3>
							<p>Цена: {item.price} ₽</p>
						</div>
						<div className="item-controls">
							<button
								onClick={() =>
									handleQuantityChange(item._id, -1)
								}
							>
								-
							</button>
							<span>{item.quantity} шт.</span>
							<button
								onClick={() =>
									handleQuantityChange(item._id, 1)
								}
							>
								+
							</button>
							<button
								className="remove-btn"
								onClick={() => handleRemoveItem(item._id)}
							>
								Удалить
							</button>
						</div>
					</div>
				))}
			</div>

			<div className="cart-summary">
				<h2>Итого: {finalPrice} ₽</h2>
				<button className="checkout-btn">Оформить заказ</button>
			</div>
		</div>
	);
};

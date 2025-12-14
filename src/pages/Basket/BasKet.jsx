import React, { useState, useEffect } from 'react';
import './Basket.css'; // Подключаем стили
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByIds } from '../../store/appReducers';

// Мок-данные (имитация товаров в корзине)

export const Basket = () => {
	const stuff = JSON.parse(localStorage.getItem('stuff'));
	const productsInBasket = useSelector(
		(state) => state.products.productsInBasket,
	);

	const [totalPrice, setTotalPrice] = useState();
	const [render, setRender] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProductsByIds(stuff));
		totalSetPrice();
	}, [render]);

	const totalSetPrice = () => {
		const total = stuff.reduce(
			(sum, item) => sum + Number(item.price) * item.quantity,
			0,
		);
		setTotalPrice(total);
		return total;
	};

	const handleRemoveItem = (itemId) => {
		const newProducts = productsInBasket.filter(
			(item) => item.id !== itemId,
		);
		localStorage.setItem('stuff', JSON.stringify(newProducts));
		setRender((prevState) => !prevState);
	};

	const handleQuantityChange = (itemId, change) => {
		const newProducts = productsInBasket.map((item) => {
			if (item.id === itemId) {
				const newQuantity = item.quantity + change;
				return { ...item, quantity: Math.max(1, newQuantity) };
			}
			return item;
		});
		localStorage.setItem('stuff', JSON.stringify(newProducts));

		setRender((prevState) => !prevState);
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
					<div key={item.id} className="cart-item">
						<div className="item-details">
							<h3>{item.title}</h3>
							<p>Цена: {item.price.toLocaleString()} ₽</p>
						</div>
						<div className="item-controls">
							<button
								onClick={() =>
									handleQuantityChange(item.id, -1)
								}
							>
								-
							</button>
							<span>{item.quantity} шт.</span>
							<button
								onClick={() => handleQuantityChange(item.id, 1)}
							>
								+
							</button>
							<button
								className="remove-btn"
								onClick={() => handleRemoveItem(item.id)}
							>
								Удалить
							</button>
						</div>
					</div>
				))}
			</div>

			<div className="cart-summary">
				<h2>Итого: {totalPrice.toLocaleString()} ₽</h2>
				<button className="checkout-btn">Оформить заказ</button>
			</div>
		</div>
	);
};

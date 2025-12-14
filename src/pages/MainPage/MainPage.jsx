import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/appReducers';
import style from './MainPage.module.css';

export const MainPage = () => {
	const products = useSelector((state) => state.products.products);
	const error = useSelector((state) => state.products.error);
	const isLoading = useSelector((state) => state.products.isLoading);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	if (isLoading) return <div>Загрузка...</div>;
	if (error) {
		return <h1>{error}</h1>;
	}
	return (
		<ul className={style.productsСontainer}>
			{products.map((product) => (
				<Link
					to={`/${product.id}`}
					key={product.id}
					className={style.imageCard}
				>
					<div className={style.contentWrapper}>
						<img src={product.image_url} />
						<p className={style.caption}>{product.title}</p>
					</div>
				</Link>
			))}
		</ul>
	);
};

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStuff } from '../../store/appReducers';
import { Link } from 'react-router-dom';

export const SaleStuff = () => {
	const dispatch = useDispatch();

	const id = useSelector((state) => state.user.authUser._id);
	const stuff = useSelector((state) => state.stuff.stuff);

	const filterStuff = stuff.filter((item) => item.author === id);

	useEffect(() => {
		dispatch(fetchStuff());
	}, [dispatch]);
	if (filterStuff.length === 0) {
		return <p>У вас нет добавленных товаров</p>;
	}
	return (
		<ul>
			{filterStuff.map((item) => (
				<li key={item._id}>
					<Link to={`/stuff/${item._id}`}>{item.name}</Link>
				</li>
			))}
		</ul>
	);
};

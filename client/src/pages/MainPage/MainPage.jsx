import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import style from './MainPage.module.css';
import { fetchStuff } from '../../store/appReducers';
import { SearchAndSort } from './SearchAndSort/SearchAndSort';
import { Pagination } from './Pagination/Pagination';

export const MainPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const search = searchParams.get('search') || '';
	const sort = searchParams.get('sort') || '';
	const page = Number(searchParams.get('page')) || 1;

	const { stuff, error, totalPages, isLoading } = useSelector(
		(state) => state.stuff,
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchStuff({ search, sort, page }));
	}, [search, sort, page, dispatch]);

	const handleSearch = (searchValue) => {
		setSearchParams({ search: searchValue, sort, page: 1 });
	};

	const handleSort = (sortValue) => {
		setSearchParams({ search, sort: sortValue, page: 1 });
	};

	const onPageChange = (p) => {
		setSearchParams({ search, sort, page: p });
		window.scrollTo(0, 0);
	};

	if (isLoading) return <div>Загрузка...</div>;
	if (error) return <h1>{error}</h1>;

	return (
		<div>
			<SearchAndSort
				onSearch={handleSearch}
				onSort={handleSort}
				currentSort={sort}
			/>

			<ul className={style.productsСontainer}>
				{stuff.map((item) => (
					<Link
						to={`/stuff/${item._id}`}
						key={item._id}
						className={style.imageCard}
					>
						<div className={style.contentWrapper}>
							<img src={item.image_url} alt={item.name} />
							<p className={style.caption}>{item.name}</p>
						</div>
					</Link>
				))}
			</ul>

			{totalPages > 1 && (
				<Pagination
					currentPage={page}
					onPageChange={onPageChange}
					totalPages={totalPages}
				/>
			)}
		</div>
	);
};

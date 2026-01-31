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

	// const { stuff, error, totalPages, isLoading } = useSelector(
	// 	(state) => state.stuff,
	// );

	const stuff = useSelector((state) => state.stuff.stuff);
	const error = useSelector((state) => state.stuff.error);
	const totalPages = useSelector((state) => state.stuff.totalPages);
	const isLoading = useSelector((state) => state.stuff.isLoading);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchStuff({ search, sort, page }));
	}, [search, sort, page, dispatch]);

	const handleSearch = (searchValue) => {
		// setSearchParams({ search: searchValue, sort, page: 1 });
		const params = { sort, page: 1 };
		if (searchValue) params.search = searchValue; // Добавляем поиск, только если он не пустой
		setSearchParams(params);
	};

	const handleSort = (sortValue) => {
		setSearchParams({ search, sort: sortValue, page: 1 });
	};

	const onPageChange = (p) => {
		setSearchParams({ search, sort, page: p });
		window.scrollTo(0, 0);
	};

	return (
		<div>
			<SearchAndSort
				initialSearch={search}
				onSearch={handleSearch}
				onSort={handleSort}
				currentSort={sort}
			/>

			{/* <ul className={style.productsСontainer}>
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
			</ul> */}

			{isLoading ? (
				<ul className={style.productsСontainer}>
					{/* Рисуем 8 пустых карточек, пока идет загрузка */}
					{[...Array(8)].map((_, i) => (
						<li key={i} className={style.skeletonCard}></li>
					))}
				</ul>
			) : error ? (
				/* Ошибка выводится аккуратно вместо списка товаров */
				<div className={style.errorMessage}>
					<h3>Упс! Произошла ошибка:</h3>
					<p>{error}</p>
					<button
						onClick={() =>
							dispatch(fetchStuff({ search, sort, page }))
						}
					>
						Попробовать снова
					</button>
				</div>
			) : (
				/* Если нет загрузки и нет ошибки — выводим контент */
				<>
					<ul className={style.productsСontainer}>
						{stuff.length > 0 ? (
							stuff.map((item) => (
								<Link
									to={`/stuff/${item._id}`}
									key={item._id}
									className={style.imageCard}
								>
									<div className={style.contentWrapper}>
										<img
											src={item.image_url}
											alt={item.name}
										/>
										<p className={style.caption}>
											{item.name}
										</p>
									</div>
								</Link>
							))
						) : (
							<p>Ничего не найдено по вашему запросу</p>
						)}
					</ul>

					{totalPages > 1 && (
						<Pagination
							currentPage={page}
							onPageChange={onPageChange}
							totalPages={totalPages}
						/>
					)}
				</>
			)}

			{/* {totalPages > 1 && (
				<Pagination
					currentPage={page}
					onPageChange={onPageChange}
					totalPages={totalPages}
				/>
			)} */}
		</div>
	);
};

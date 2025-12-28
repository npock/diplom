import { useState } from 'react';
import style from './SearchAndSort.module.css';

export const SearchAndSort = ({ currentSort, onSearch, onSort }) => {
	const [tempSearch, setTempSearch] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		onSearch(tempSearch);
	};

	const handleSearch = (e) => {
		setTempSearch(e.target.value);
	};

	const handleSort = (e) => {
		onSort(e.target.value);
	};

	return (
		<div className={style.controls}>
			<form onSubmit={handleSubmit} className={style.searchForm}>
				<input
					type="text"
					placeholder="Найти чудо-рыбу..."
					value={tempSearch}
					onChange={handleSearch}
					className={style.input}
				/>
				<button type="submit" className={style.searchBtn}>
					Найти
				</button>
			</form>

			<select
				onChange={handleSort}
				className={style.select}
				value={currentSort}
			>
				<option value="">Сначала новые</option>
				<option value="price_asc">Дешевле</option>
				<option value="price_desc">Дороже</option>
			</select>
		</div>
	);
};

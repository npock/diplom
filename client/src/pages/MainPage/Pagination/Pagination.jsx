import style from './Paginatiom.module.css';

export const Pagination = ({ totalPages, currentPage, onPageChange }) => {
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

	return (
		<div className={style.pagination}>
			{pages.map((page) => (
				<button
					key={page}
					className={
						currentPage === page ? style.activePage : style.pageBtn
					}
					onClick={() => onPageChange(page)}
				>
					{page}
				</button>
			))}
		</div>
	);
};

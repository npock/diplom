import { Outlet, useLocation, useParams } from 'react-router-dom';

export function UserLayout() {
	const { id } = useParams();
	const location = useLocation();
	return (
		<div className="">
			<div className="">
				<h2 className="">User {id}</h2>
				<p className="">Current location: {location.pathname}</p>

				{/* Здесь будут вложенные страницы */}
				<div className="">
					<Outlet />
				</div>
			</div>
		</div>
	);
}

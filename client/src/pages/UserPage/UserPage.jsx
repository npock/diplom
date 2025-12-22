import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UserPage() {
	const authUser = useSelector((state) => state.user.authUser);
	const isLoadingUser = useSelector((state) => state.user.isLoading);
	const userError = useSelector((state) => state.user.error);

	const navigate = useNavigate();

	if (isLoadingUser) {
		return <span>...loading</span>;
	}
	if (userError) {
		return <span>smth went wrong</span>;
	}

	return (
		<div className="">
			<h3 className="">User Profile</h3>

			<div className="">
				<p className="">👤 Имя: {authUser?.name}</p>
				<p className="">📧 Email: {authUser?.email}</p>
				<p className=""> Дата регистрации: {authUser?.createdAt}</p>
				<p className=""> Role: {authUser?.role}</p>

				<Link to={`/users/${authUser._id}/edit`}>Edit</Link>
				<button className="" onClick={() => navigate(-1)}>
					back
				</button>
			</div>
		</div>
	);
}

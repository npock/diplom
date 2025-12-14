import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchRoles, getRoleById, getUserById } from '../../store/appReducers';
import { useDispatch, useSelector } from 'react-redux';

export default function UserPage() {
	const { id } = useParams();

	const roles = useSelector((state) => state.roles.roles);
	const rolesError = useSelector((state) => state.roles.error);
	const isLoadingRoles = useSelector((state) => state.roles.isLoading);

	const user = useSelector((state) => state.users.user);
	const isLoadingUser = useSelector((state) => state.users.isLoading);
	const userError = useSelector((state) => state.users.error);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	// const [user, setUser] = useState({});
	// const [isLoading, setIsLoading] = useState(true);
	// const [error, setError] = useState(null);

	// const getUserById = async (id) => {
	// 	try {
	// 		const response = await fetch(`http://localhost:3000/users/${id}`);
	// 		if (!response.ok) {
	// 			throw new Error('Ошибка в запросе на сервер');
	// 		}
	// 		const data = await response.json();
	// 		setUser(data);
	// 		setIsLoading(false);
	// 	} catch (error) {
	// 		console.log(error);
	// 		setIsLoading(false);
	// 		setError(error);
	// 	}
	// };

	useEffect(() => {
		dispatch(getUserById(id));

		if (roles.length === 0) {
			dispatch(fetchRoles());
		}
	}, [id, roles, dispatch]);

	if (isLoadingRoles || isLoadingUser) {
		return <span>...loading</span>;
	}
	if (userError || rolesError) {
		return <span>smth went wrong</span>;
	}

	return (
		<div className="">
			<h3 className="">User Profile</h3>

			<div className="">
				<p className="">👤 Имя: {user?.name}</p>
				<p className="">📧 Email: {user?.email}</p>
				<p className=""> Дата регистрации: {user?.registed_at}</p>
				<p className=""> Role: {getRoleById(roles, user?.role_id)}</p>

				<Link to={`/user/${id}/edit`}>Edit</Link>
				<button className="" onClick={() => navigate('/users')}>
					back
				</button>
			</div>
		</div>
	);
}

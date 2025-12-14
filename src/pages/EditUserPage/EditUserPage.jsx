import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchRoles, updateRoleUserAsync } from '../../store/appReducers';
import { useDispatch, useSelector } from 'react-redux';
import { SelectField } from '../../components/SelectField/SelectField';

export default function EditUserPage() {
	const { id } = useParams();
	const roles = useSelector((state) => state.roles.roles);
	const rolesError = useSelector((state) => state.roles.error);

	const dispatch = useDispatch();

	const [user, setUser] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	const getUserById = async (id) => {
		try {
			const response = await fetch(`http://localhost:3000/users/${id}`);
			if (!response.ok) {
				throw new Error('Ошибка в запросе на сервер');
			}
			const data = await response.json();
			setUser(data);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
			setError(error);
		}
	};

	const optionRoles = roles.map((key) => ({
		value: key.id,
		label: key.name,
	}));

	const handleChange = (e) => {
		const { value } = e.target;

		const newUser = { ...user, role_id: value };
		setUser(newUser);
		console.log(newUser);
	};
	const handleSubmit = () => {
		event.preventDefault();
		dispatch(updateRoleUserAsync(id, user));

		navigate(`/user/${id}`);
	};

	useEffect(() => {
		setIsLoading(true);
		getUserById(id);
		if (roles.length === 0) {
			dispatch(fetchRoles());
		}
	}, [id, roles, dispatch]);

	if (isLoading) {
		return <span>...loading</span>;
	}
	if (error || rolesError) {
		return <span>smth went wrong</span>;
	}

	return (
		<div className="">
			<h3 className="">User Profile</h3>

			<div className="">
				<p className="">👤 Имя: {user.name}</p>
				<p className="">📧 Email: {user.email}</p>
				<p className=""> Дата регистрации: {user.registed_at}</p>
				<form onSubmit={handleSubmit}>
					{
						<SelectField
							name="role"
							label="Role"
							options={optionRoles}
							onChange={handleChange}
							value={user.role_id}
						/>
					}
					<button className="" type="submit">
						Сохранить
					</button>
				</form>
				<button className="" onClick={() => navigate(-1)}>
					Отмена
				</button>
			</div>
			{/* <Modal /> */}
		</div>
	);
}

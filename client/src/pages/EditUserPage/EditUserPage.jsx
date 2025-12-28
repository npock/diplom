import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { validator } from '../utils/validator';
import { TextField } from '../../components/TextField/TextField';
import { Button } from '../../components/Button/Button';
import { updateAuthUserAsync } from '../../store/appReducers';

export const EditUserPage = () => {
	const authUser = useSelector((state) => state.user.authUser);
	const isLoadingUser = useSelector((state) => state.user.isLoading);
	const userError = useSelector((state) => state.user.error);

	const navigate = useNavigate();

	const [userData, setUserData] = useState({
		name: authUser?.name || '',
		email: authUser?.email || '',
	});
	const [formError, setFormError] = useState({});

	const dispatch = useDispatch();

	const userSchema = {
		email: {
			isRequired: { message: 'Обязательное поле' },
			isEmail: { message: 'Введите корректный email' },
		},
		name: {
			isRequired: { message: 'Обязательное поле' },
			min: { message: 'Минимум 2 символов', value: 2 },
		},
	};

	const validate = (data) => {
		const error = validator(data, userSchema);
		setFormError(error);
		return Object.keys(error).length === 0;
	};

	const isValid = Object.keys(formError).length === 0;

	const handleSubmit = (e) => {
		e.preventDefault();

		const isValid = validate(userData);
		if (!isValid) return;
		console.log(userData);
		dispatch(updateAuthUserAsync(authUser._id, userData));
	};

	const handleChange = (e) => {
		const { value, name } = e.target;

		setUserData({ ...userData, [name]: value });
		validate({ ...userData, [name]: value });
	};

	useEffect(() => {
		if (authUser) {
			setUserData({
				name: authUser?.name || '',
				email: authUser?.email || '',
			});
		}
	}, [authUser]);

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
				<form onSubmit={handleSubmit}>
					<h2>Редактирование</h2>
					<TextField
						name="email"
						label="Email"
						placeholder="Введите Email"
						value={userData?.email}
						onChange={handleChange}
						error={formError?.email}
						type="text"
					/>
					<TextField
						name="name"
						label="Имя"
						placeholder="Введите ваше имя..."
						value={userData?.name}
						onChange={handleChange}
						error={formError?.name}
						type="text"
					/>
					<Button disabled={!isValid} type="submit">
						сохранить
					</Button>
				</form>

				<p className=""> Дата регистрации: {authUser?.createdAt}</p>
				<p className=""> Role: {authUser?.role}</p>

				<button className="" onClick={() => navigate(-1)}>
					back
				</button>
			</div>
		</div>
	);
};

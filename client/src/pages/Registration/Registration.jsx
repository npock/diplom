import { useState } from 'react';
import { validator } from '../utils/validator';
import style from '../AuthReg.module.css';
import { TextField } from '../../components/TextField/TextField';
// import { server } from '../../bff/server';
import { Button } from '../../components/Button/Button';
// import { setUser } from '../../store/actions/set-user';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../store/appReducers';
import { Link } from 'react-router-dom';

export const Regisration = () => {
	const [userData, setUserData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [error, setError] = useState({});
	const [firstSubmit, setFirstSubmit] = useState(false);
	const serverError = useSelector((state) => state.user.error);

	const dispatch = useDispatch();

	const userSchema = {
		name: {
			isRequired: { message: 'Обязательное поле' },
			min: { message: 'Минимум 2 символа', value: 2 },
			max: { message: 'Максимум 20 символов', value: 20 },
		},
		email: {
			isRequired: { message: 'Обязательное поле' },
			isEmail: { message: 'Введите корректный email' },
		},
		password: {
			isRequired: { message: 'Обязательное поле' },
			min: { message: 'Минимум 6 символов', value: 6 },
			max: { message: 'Максимум 10 символов', value: 10 },
		},
		confirmPassword: {
			checkPassword: {
				message: 'Пароли не совпадают',
				ref: 'password',
			},
		},
	};

	const validate = (userData) => {
		const error = validator(userData, userSchema);
		setError(error);
		return Object.keys(error).length === 0;
	};

	const isValid = Object.keys(error).length === 0;

	const handleSubmit = (e) => {
		e.preventDefault();

		const isValid = validate(userData);
		setFirstSubmit(true);
		if (!isValid) return;
		// eslint-disable-next-line no-unused-vars
		const { confirmPassword, ...newUserData } = userData;
		dispatch(register(newUserData));

		setUserData({
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		});
	};

	const handleChange = (e) => {
		const { value, name } = e.target;
		setUserData({ ...userData, [name]: value });
		if (firstSubmit) {
			validate({ ...userData, [name]: value });
		}
	};

	return (
		<>
			<div className={style.registartionFormContiner}>
				<h2>Regisration</h2>
				<form onSubmit={handleSubmit}>
					<TextField
						name="name"
						label="Имя"
						placeholder="Введите имя"
						value={userData.name}
						onChange={handleChange}
						error={error?.name}
						type="text"
					/>
					<TextField
						name="email"
						label="Email"
						placeholder="Введите Email"
						value={userData.email}
						onChange={handleChange}
						error={error?.email}
						type="text"
					/>
					<TextField
						name="password"
						label="password"
						placeholder="Введите password"
						value={userData.password}
						onChange={handleChange}
						error={error?.password}
						type="text"
					/>
					<TextField
						name="confirmPassword"
						label="Повтор Пароля"
						placeholder="Введите повторяющий password"
						value={userData.confirmPassword}
						onChange={handleChange}
						error={error?.confirmPassword}
						type="text"
					/>

					<Button
						className={style.buttonSign}
						disabled={!isValid}
						type="submit"
					>
						Зарегестрироваться
					</Button>
				</form>
				<Link className={style.register} to="/login">
					Вход
				</Link>
				{firstSubmit ? (
					<div className={style.serverError}>{serverError}</div>
				) : null}
				{/* {firstSubmit && serverError && (
					<div className={style.serverError}>{serverError}</div>
				)} */}
			</div>
		</>
	);
};

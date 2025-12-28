import { useState } from 'react';
import { TextField } from '../../components/TextField/TextField';
import style from '../AuthReg.module.css';
import { validator } from '../utils/validator';
import { Button } from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/appReducers';

export const Authorization = () => {
	const [userData, setUserData] = useState({
		email: '',
		password: '',
	});
	const [formError, setFormError] = useState({});
	const [firstSubmit, setFirstSubmit] = useState(false);
	const serverError = useSelector((state) => state.user.error);

	const dispatch = useDispatch();

	const userSchema = {
		email: {
			isRequired: { message: 'Обязательное поле' },
			isEmail: { message: 'Введите корректный email' },
		},
		password: {
			isRequired: { message: 'Обязательное поле' },
			min: { message: 'Минимум 6 символов', value: 6 },
			max: { message: 'Максимум 10 символов', value: 10 },
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

		dispatch(login(userData));
		setFirstSubmit(true);

		// setUserData({
		// 	email: '',
		// 	password: '',
		// });
	};

	const handleChange = (e) => {
		const { value, name } = e.target;

		validate({ ...userData, [name]: value });

		setUserData({ ...userData, [name]: value });
	};

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className={style.registartionFormContiner}
			>
				<h2>Authorization</h2>
				<TextField
					name="email"
					label="Email"
					placeholder="Введите Email"
					value={userData.email}
					onChange={handleChange}
					error={formError?.email}
					type="text"
				/>
				<TextField
					name="password"
					label="password"
					placeholder="Введите password"
					value={userData.password}
					onChange={handleChange}
					error={formError?.password}
					type="text"
				/>
				<Button
					className={style.buttonSign}
					disabled={!isValid}
					type="submit"
				>
					Войти
				</Button>

				{serverError && (
					<div className={style.serverError}>
						{firstSubmit ? serverError : null}
						<Link className={style.register} to="/register">
							Регистрация
						</Link>
					</div>
				)}
			</form>
		</>
	);
};

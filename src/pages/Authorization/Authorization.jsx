import { useState } from 'react';
import { TextField } from '../../components/TextField/TextField';
import style from './Authorization.module.css';
import { validator } from './utils/validator';
import { server } from '../../bff/server';
import { Button } from '../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/actions/set-user';

export const AuthorizationForm = () => {
	const [userData, setUserData] = useState({
		email: '',
		password: '',
	});
	const [formError, setFormError] = useState({});
	const [serverError, setServerError] = useState(null);
	const [firstSubmit, setFirstSubmit] = useState(true);
	const dispatch = useDispatch();
	const user = useSelector((state) => state);
	console.log(user);
	// const navigate = useNavigate();

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

		setFirstSubmit(false);

		const isValid = validate(userData);
		if (!isValid) return;
		console.log(userData);
		server
			.authorize(userData.email, userData.password)
			.then(({ error, res }) => {
				if (error) {
					setServerError(`error response ${error}`);
					return;
				}
				dispatch({ type: 'SET_USER', payload: res });
			});
	};

	const handleChange = (e) => {
		const { value, name } = e.target;

		if (!firstSubmit) {
			validate({ ...userData, [name]: value });
		}
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
						{serverError}
						<Link className={style.register} to="/register">
							Регистрация
						</Link>
					</div>
				)}
			</form>
		</>
	);
};

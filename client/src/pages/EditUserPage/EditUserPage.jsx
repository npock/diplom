import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { validator } from '../utils/validator';
import { TextField } from '../../components/TextField/TextField';
import { Button } from '../../components/Button/Button';
import { updateAuthUserAsync } from '../../store/appReducers';
import styles from './EditUserPage.module.css';

export const EditUserPage = () => {
	const authUser = useSelector((state) => state.user.authUser);
	const isLoadingUser = useSelector((state) => state.user.isLoading);
	const userError = useSelector((state) => state.user.error);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [userData, setUserData] = useState({
		name: authUser?.name || '',
		email: authUser?.email || '',
	});
	const [formError, setFormError] = useState({});

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
		const isValidForm = validate(userData);
		if (!isValidForm) return;
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

	if (isLoadingUser)
		return (
			<div className={styles.pageContainer}>
				<span>...loading</span>
			</div>
		);
	if (userError)
		return (
			<div className={styles.pageContainer}>
				<span>smth went wrong</span>
			</div>
		);

	return (
		<div className={styles.pageContainer}>
			<div className={styles.editCard}>
				<h3 className={styles.title}>Edit Profile</h3>

				<form onSubmit={handleSubmit} className={styles.form}>
					<TextField
						name="email"
						label="Электронная почта"
						placeholder="example@mail.com"
						value={userData?.email}
						onChange={handleChange}
						error={formError?.email}
						type="text"
					/>
					<TextField
						name="name"
						label="Ваше имя"
						placeholder="Введите имя"
						value={userData?.name}
						onChange={handleChange}
						error={formError?.name}
						type="text"
					/>
					<div className={styles.footer}>
						<Button disabled={!isValid} type="submit">
							Сохранить изменения
						</Button>
						<button
							type="button"
							className={styles.backBtn}
							onClick={() => navigate(-1)}
						>
							← Отмена
						</button>
					</div>
				</form>

				<div className={styles.metaInfo}>
					<p>
						📅 <strong>Регистрация:</strong>{' '}
						{new Date(authUser?.createdAt).toLocaleDateString()}
					</p>
					<p>
						🛡️ <strong>Роль:</strong> {authUser?.role}
					</p>
				</div>
			</div>
		</div>
	);
};

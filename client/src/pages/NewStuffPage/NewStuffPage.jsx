import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { validator } from '../utils/validator';
import { TextField } from '../../components/TextField/TextField';
import { Button } from '../../components/Button/Button';
import { TextArea } from '../../components/TextArea/TexrArea';
import { addStuffAsync } from '../../store/appReducers';

export const NewStuffPage = () => {
	const [data, setData] = useState({
		name: '',
		price: '',
		description: '',
		image_url: '',
	});
	const [formError, setFormError] = useState({});

	const isLoading = useSelector((state) => state.stuff.isLoading);

	const dispatch = useDispatch();

	// const navigate = useNavigate();

	const userSchema = {
		name: {
			isRequired: { message: 'Обязательное поле' },
		},
		price: {
			isNumber: { message: 'Тут должно быть число' },
			minNum: { message: 'Минимум 2', value: 2 },
		},
		description: {
			isRequired: { message: 'Обязательное поле' },
			min: { message: 'Минимум 10 символов', value: 10 },
		},
		image_url: {
			isLink: {
				message: 'Некорректный адрес',
			},
		},
	};

	const validate = (data) => {
		const error = validator(data, userSchema);
		setFormError(error);
		return Object.keys(error).length === 0;
	};

	const isValid = Object.keys(formError).length === 0;

	const handleChange = (e) => {
		const { name, value } = e.target;

		setData((prev) => ({ ...prev, [name]: value }));
		validate({ ...data, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const isValid = validate(data);
		if (!isValid) return;

		dispatch(addStuffAsync(data));
		setData({ name: '', price: '', description: '', image_url: '' });
	};

	const containerStyle = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: '80vh',
	};

	useEffect(() => {
		dispatch({ type: 'ISLOADING_FALSE' });
	}, [dispatch]);

	return (
		<div className="container" style={containerStyle}>
			<h2>Добавление нового товара</h2>
			<form onSubmit={handleSubmit}>
				<TextField
					label="Название товара"
					name="name"
					value={data.name}
					onChange={handleChange}
					error={formError?.name}
					type="text"
				/>
				<TextField
					label="Цена"
					name="price"
					type="number"
					value={data.price}
					onChange={handleChange}
					error={formError?.price}
				/>
				<TextField
					label="Ссылка на фото"
					name="image_url"
					value={data.image_url}
					onChange={handleChange}
					placeholder="https://example.com/image.jpg"
					error={formError?.image_url}
				/>

				<TextArea
					label="Описание товара"
					name="description"
					value={data.description}
					onChange={handleChange}
					error={formError?.description}
					placeholder="Опишите товар"
				/>

				<Button type="submit" disabled={!isValid || isLoading}>
					{isLoading ? 'Загрузка...' : 'Добавить товар'}
				</Button>
			</form>
		</div>
	);
};

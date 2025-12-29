import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validator } from '../../utils/validator';
import { TextField } from '../../../components/TextField/TextField';
import { Button } from '../../../components/Button/Button';
import { TextArea } from '../../../components/TextArea/TexrArea';
import { useParams } from 'react-router-dom';
import {
	deleteStuffAsync,
	fetchOneStuff,
	updateStuffAsync,
} from '../../../store/appReducers';

export const EditStuffPage = () => {
	const { id } = useParams();

	const stuff = useSelector((state) => state.oneStuff.oneStuff);
	const authUser = useSelector((state) => state.user.authUser);
	const error = useSelector((state) => state.oneStuff.error);
	const isLoading = useSelector((state) => state.oneStuff.isLoading);

	const [data, setData] = useState({
		name: stuff?.name,
		price: stuff?.price,
		description: stuff?.description,
		image_url: stuff?.image_url,
	});
	const [formError, setFormError] = useState({});

	const dispatch = useDispatch();

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

		dispatch(updateStuffAsync(id, data));
	};

	useEffect(() => {
		dispatch(fetchOneStuff(id));
	}, [id, dispatch]);

	useEffect(() => {
		if (stuff) {
			setData({
				name: stuff.name || '',
				price: stuff.price || '',
				description: stuff.description || '',
				image_url: stuff.image_url || '',
			});
		}
	}, [stuff]);
	const containerStyle = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: '80vh',
	};

	const isAuthor = authUser?._id === stuff?.author;
	const isAdmin = authUser?.role === 'admin';

	if (!isLoading && stuff && !isAuthor && !isAdmin) {
		return (
			<div className="container">
				У вас нет прав на редактирование этого товара
			</div>
		);
	}

	if (isLoading) {
		return <span>...loading</span>;
	}
	if (error) {
		return <span>smth went wrong</span>;
	}

	return (
		<div className="container" style={containerStyle}>
			<h2>Редактирование товара</h2>
			<form onSubmit={handleSubmit}>
				<TextField
					label="Название товара"
					name="name"
					value={data?.name}
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
				{data.image_url ? (
					<img src={data.image_url} alt="preview" />
				) : (
					<div className="no-image">Нет изображения</div>
				)}
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

				<Button type="submit" disabled={!isValid && isLoading}>
					{isLoading && !isValid ? 'Загрузка...' : 'Сохранить'}
				</Button>
				<Button
					variant="delete"
					onClick={() => dispatch(deleteStuffAsync(id))}
				>
					Delete
				</Button>
			</form>
		</div>
	);
};

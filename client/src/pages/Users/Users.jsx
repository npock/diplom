import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteUser, fetchUsers } from '../../store/appReducers';
import { RoleEdit } from './RoleEdit';

export const Users = () => {
	const dispatch = useDispatch();
	const users = useSelector((state) => state.users.users);

	const standartTime = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleString();
	};

	const columns = {
		login: {
			path: 'Email',
			name: 'Email',
			component: (item) => {
				return <>{item.email}</>;
			},
		},
		dateReg: {
			path: 'dateReg',
			name: 'Дата регистрации',
			component: (item) => {
				return <span>{standartTime(item.createdAt)}</span>;
			},
		},
		role: {
			name: 'Роль',
			path: 'role',
			component: (item) => (
				<>
					<span>{<RoleEdit role={item.role} id={item._id} />}</span>
				</>
			),
		},
		delete: {
			name: 'Удалить',
			component: (item) => {
				if (item.role !== 'admin')
					return (
						<button onClick={() => dispatch(deleteUser(item._id))}>
							Удалить
						</button>
					);
			},
		},
	};

	const renderColumn = (item, column) => {
		const component = columns[column].component;
		if (component && typeof component === 'function') {
			return component(item);
		} else {
			return item[column];
		}
	};

	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

	return (
		<>
			<h2>Пользователи</h2>

			<table>
				<thead>
					<tr>
						{Object.keys(columns).map((key) => (
							<th key={key}>{columns[key].name}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{users.map((item) => {
						return (
							<tr key={item._id}>
								{Object.keys(columns).map((column) => (
									<td key={column}>
										{renderColumn(item, column)}
									</td>
								))}
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};

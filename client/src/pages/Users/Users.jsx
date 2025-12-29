import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteUser, fetchUsers } from '../../store/appReducers';
import { RoleEdit } from './RoleEdit';
import { Button } from '../../components/Button/Button';

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
						<Button
							className="delete"
							onClick={() => dispatch(deleteUser(item._id))}
						>
							Удалить
						</Button>
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
	const containerStyle = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start',
		minHeight: '80vh',
		paddingTop: '40px',
		marginTop: '30px',
	};

	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

	return (
		<div style={containerStyle}>
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
		</div>
	);
};

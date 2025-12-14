import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchRoles, fetchUsers, getRoleById } from '../../store/appReducers';
import { Link } from 'react-router-dom';

export const Users = () => {
	const dispatch = useDispatch();
	const users = useSelector((state) => state.users.users);
	const errorUpdateUser = useSelector((state) => state.users.error);
	const errorRoles = useSelector((state) => state.roles.error);
	const roles = useSelector((state) => state.roles.roles);

	const columns = {
		login: {
			path: 'Email',
			name: 'Email',
			component: (item) => {
				return <Link to={`/user/${item.id}`}>{item.email}</Link>;
			},
		},
		dateReg: {
			path: 'dateReg',
			name: 'Дата регистрации',
			component: (item) => {
				return <span>{item.registed_at}</span>;
			},
		},
		role: {
			name: 'Роль',
			path: 'role',
			component: (item) => (
				<>
					<span>{getRoleById(roles, item.role_id)}</span>
					{/* <SelectRoles item={item} /> */}
				</>
			),
		},
		delete: {
			name: 'Удалить',
			component: (item) => {
				return (
					<button onClick={() => console.log('delete', item)}>
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
		dispatch(fetchRoles());
	}, [dispatch]);
	console.log();

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
							<tr key={item.id}>
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
			{errorRoles && <span>{errorRoles}</span>}
			{errorUpdateUser && <span>{errorUpdateUser}</span>}
		</>
	);
};

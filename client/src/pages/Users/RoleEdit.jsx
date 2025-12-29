import { useState } from 'react';
import { SelectField } from '../../components/SelectField/SelectField';
import { updateRoleUserAsync } from '../../store/appReducers';
import { useDispatch } from 'react-redux';

export const RoleEdit = ({ role, id }) => {
	const [newRole, setNewRole] = useState({ role });
	const dispatch = useDispatch();
	const optionRoles = [
		{ value: 'user', label: 'user' },
		{ value: 'moderator', label: 'moderator' },
	];
	const handleChange = (e) => {
		const { value } = e.target;
		setNewRole({ role: value });
	};
	const handleSubmit = () => {
		event.preventDefault();

		dispatch(updateRoleUserAsync(id, newRole));
	};
	if (role === 'admin') {
		return <>{role}</>;
	}
	return (
		<>
			<form onSubmit={handleSubmit}>
				{
					<SelectField
						name="role"
						options={optionRoles}
						onChange={handleChange}
						value={newRole.role}
					/>
				}
				<Button className="" type="submit">
					Сохранить
				</Button>
			</form>
		</>
	);
};

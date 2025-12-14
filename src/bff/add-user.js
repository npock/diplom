import { generateDate } from './generate-date';

export const addUser = ({ name, email, password }) =>
	fetch('http://localhost:3000/users', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			name,
			email,
			password,
			registed_at: generateDate(),
			role_id: '2',
		}),
	}).then((loadedUser) => loadedUser.json());

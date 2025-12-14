import { getUser } from './get-user';
import { addUser } from './add-user';
// import { createSession } from './craete-session';
import { sessions } from './sessions';

export const server = {
	logout(session) {
		sessions.remove(session);
	},

	async authorize({ email, password }) {
		const user = await getUser(email);
		console.log(user);
		if (!user) {
			return {
				error: 'такой пользователь не найден',
				res: null,
			};
		}
		if (password !== user.password) {
			return {
				error: 'неверый пароль',
				res: null,
			};
		}

		return {
			error: null,
			res: {
				name: user.name,
				id: user.id,
				email: user.email,
				roleId: user.role_id,
				session: sessions.create(user),
			},
		};
	},

	async register(userData) {
		const existedUser = await getUser(userData.email);

		if (existedUser) {
			return {
				error: 'такой email уже занят',
				res: null,
			};
		}

		const user = await addUser(userData);

		return {
			error: null,
			res: {
				name: user.name,
				id: user.id,
				email: user.email,
				roleId: user.role_id,
				session: sessions.create(user),
			},
		};
	},
};

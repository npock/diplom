import { server } from '../../bff/server';

export const logoutUser = (session) => {
	server.logout(session);
	return { type: 'LOGOUT' };
};

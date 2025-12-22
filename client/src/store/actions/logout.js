import { server } from '../../bff/server';

export const logoutUser = (session) => {
	server.logout(session);
	// localStorage.removeItem('user');
	return { type: 'LOGOUT' };
};

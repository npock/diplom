import { ROLE } from '../../bff/constants/role';

const initialUserState = {
	id: null,
	login: null,
	roleId: ROLE.GUEST,
	session: null,
};

export const userReducer = (state = initialUserState, { type, payload }) => {
	switch (type) {
		case 'SET_USER': {
			return { ...state, ...payload };
		}
		case 'LOGOUT':
			return initialUserState;

		default:
			return state;
	}
};

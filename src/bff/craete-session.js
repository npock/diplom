import { removeReview } from './session';
import { ROLE } from './constants/role';

export const createSession = (role_id) => {
	let session = {
		logOut() {
			Object.keys(session).forEach((key) => {
				delete session[key];
			});
		},
	};

	switch (role_id) {
		case ROLE.ADMIN: {
			session.removeReview = removeReview;
			break;
		}
		case ROLE.MODERATOR: {
			session.removeReview = removeReview;
			break;
		}
		case ROLE.READER: {
			break;
		}
		default:
		//nothing doing
	}

	return session;
};

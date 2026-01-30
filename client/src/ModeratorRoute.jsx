import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const ModeratorRoute = ({ children }) => {
	const user = useSelector((state) => state.user.authUser);
	const isLoading = useSelector((state) => state.user.isLoading);
	const error = useSelector((state) => state.user.error);

	if (isLoading) {
		return <div>Загрузка...</div>;
	}
	if (error) {
		return <div>error</div>;
	}
	if (!user || user.role !== 'admin' || user.role !== 'moderator') {
		return <Navigate to={'/'} replace />;
	}

	return children;
};

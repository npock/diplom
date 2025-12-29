import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const IsAuthRoute = ({ children }) => {
	const user = useSelector((state) => state.user.authUser);
	const isLoading = useSelector((state) => state.user.isLoading);
	// const location = useLocation();

	if (isLoading) {
		return <div>Загрузка...</div>;
	}

	if (!user || !user.name) {
		return <Navigate to={'/login'} replace />;
	}

	return children;
};

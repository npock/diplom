import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const AdminRoute = ({ children }) => {
	const user = useSelector((state) => state.user.authUser);
	const isLoading = useSelector((state) => state.user.isLoading);

	if (isLoading) {
		return <div>Загрузка...</div>;
	}

	if (!user || user.role !== 'admin') {
		return <Navigate to={'/'} replace />;
	}

	return children;
};

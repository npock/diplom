import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMe } from './store/appReducers';

export const AppInizilisation = ({ children }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getMe());
	}, [dispatch]);

	return <>{children}</>;
};

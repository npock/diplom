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

// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getMe } from './store/appReducers';

// export const AppInizilisation = ({ children }) => {
// 	const dispatch = useDispatch();
// 	const [isReady, setIsReady] = useState(false); // Флаг готовности

// 	useEffect(() => {
// 		// Мы ждем завершения getMe, прежде чем показать приложение
// 		dispatch(getMe()).finally(() => {
// 			setIsReady(true);
// 		});
// 	}, [dispatch]);

// 	// Пока запрос идет, показываем лоадер, а не всё приложение
// 	if (!isReady) {
// 		return <div>Загрузка данных...</div>;
// 	}

// 	return <>{children}</>;
// };

import { Provider } from 'react-redux';
import { createStore } from './store/createStore';
import { router } from './AppRouter';

export const AppProvider = ({ children }) => {
	const store = createStore(router);
	return <Provider store={store}>{children}</Provider>;
};

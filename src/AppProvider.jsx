import { Provider } from 'react-redux';
import { createStore } from './store/createStore';
import { useNavigate } from 'react-router-dom';

export const AppProvider = ({ children }) => {
	const navigate = useNavigate();
	const store = createStore(navigate);
	return <Provider store={store}>{children}</Provider>;
};

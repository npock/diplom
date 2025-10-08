import { Provider } from 'react-redux';
import { createStore } from './store/createStore';
import { Shop } from './Shop';
import { useNavigate } from 'react-router-dom';

export const App = () => {
	const navigate = useNavigate();
	const store = createStore(navigate);
	return (
		<Provider store={store}>
			<Shop />
		</Provider>
	);
};

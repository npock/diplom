import { Provider } from 'react-redux';
import { Header } from './components/Header/Header';
import { Authorization } from './pages/Authorization/Authorization';
import { Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';

export const AppRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<div>mainPage</div>} />
			<Route path="/login" element={<Authorization />} />
			<Route path="/register" element={<div>registration</div>} />
			<Route path="/users" element={<div>users</div>} />
			<Route path="/product" element={<div>new product</div>} />
			<Route path="/product/product_id" element={<div>product</div>} />
			<Route path="*" element={<div>error</div>} />
		</Routes>
	);
};

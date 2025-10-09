import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

import { AppRouter } from './AppRouter';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Authorization } from './pages/Authorization/Authorization';
// import { createStore } from './store/createStore';
import { Provider } from 'react-redux';
import { createStore } from './store/createStore';
import { AppProvider } from './AppProvider';

export const Shop = () => {
	const store = createStore();
	return (
		<Provider store={store}>
			<div className="appColumn">
				<Header />
				<div className="content">
					<h2>Content</h2>
					<Routes>
						<Route path="/" element={<div>mainPage</div>} />
						<Route path="/login" element={<Authorization />} />
						<Route
							path="/register"
							element={<div>registration</div>}
						/>
						<Route path="/users" element={<div>users</div>} />
						<Route
							path="/product"
							element={<div>new product</div>}
						/>
						<Route
							path="/product/product_id"
							element={<div>product</div>}
						/>
						<Route path="*" element={<div>error</div>} />
					</Routes>
				</div>
				<Footer />
			</div>
		</Provider>
	);
};

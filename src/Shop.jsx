// import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { AuthorizationForm } from './pages/Authorization/Authorization';

export const Shop = () => {
	return (
		<div className="appColumn">
			<Header />
			<div className="content">
				<h2>Content</h2>
				<Routes>
					<Route path="/" element={<div>mainPage</div>} />
					<Route path="/login" element={<AuthorizationForm />} />
					<Route path="/register" element={<div>registration</div>} />
					<Route path="/users" element={<div>users</div>} />
					<Route path="/product" element={<div>new product</div>} />
					<Route
						path="/product/product_id"
						element={<div>product</div>}
					/>
					<Route path="*" element={<div>error</div>} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
};

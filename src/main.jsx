import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
// import { AppProvider } from './AppProvider.jsx';
import { Shop } from './Shop.jsx';
import { Provider } from 'react-redux';
// import { store } from './store/createStore.js';
import { AppProvider } from './AppProvider.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<Shop />
		</BrowserRouter>
	</StrictMode>,
);

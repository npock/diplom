import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { AppProvider } from './AppProvider.jsx';
import { router } from './AppRouter.jsx';

import { RouterProvider } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
	<AppProvider>
		<RouterProvider router={router} />
	</AppProvider>,
);

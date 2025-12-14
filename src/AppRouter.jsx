import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from './components/Loyouts/MainLoyuot';
import { Suspense } from 'react';
import { Users } from './pages/Users/Users';
import { Authorization } from './pages/Authorization/Authorization';
import { Regisration } from './pages/Registration/Registration';
import { UserLayout } from './components/Loyouts/UserLayout';
import UserPage from './pages/UserPage/UserPage';
import { MainPage } from './pages/MainPage/MainPage';
import { ProductPage } from './pages/ProductPage/ProductPage';
import EditUserPage from './pages/EditUserPage/EditUserPage';
import { Basket } from './pages/Basket/BasKet';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				index: true,
				element: <MainPage />,
			},
			{
				path: '/:id',
				element: <ProductPage />,
				// children: [
				// 	{
				// 		index: true,

				// 		element: <UserPage />,
				// 	},
				// 	{
				// 		path: 'edit',

				// 		//  element: <EditPage />,
				// 	},
				// ],
			},
			{
				path: '/login',
				element: <Authorization />,
			},
			{
				path: '/register',
				element: <Regisration />,
			},
			{
				path: '/users',
				element: <Users />,
			},
			{
				path: '/user/:id',
				element: <UserLayout />,
				children: [
					{
						index: true,

						element: <UserPage />,
					},
					{
						path: 'edit',

						element: <EditUserPage />,
					},
				],
			},
			{
				path: '/product/:id',
				element: <div>new product</div>,
			},
			{
				path: '/basket',
				element: <Basket />,
			},
		],
	},
]);

// export const AppRouter = () => {
// 	return <RouterProvider router={router} />;
// };

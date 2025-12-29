import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from './components/Loyouts/MainLoyuot';
import { Users } from './pages/Users/Users';
import { Authorization } from './pages/Authorization/Authorization';
import { Regisration } from './pages/Registration/Registration';
import { UserLayout } from './components/Loyouts/UserLayout';
import UserPage from './pages/UserPage/UserPage';
import { MainPage } from './pages/MainPage/MainPage';
import { EditUserPage } from './pages/EditUserPage/EditUserPage';
import { Basket } from './pages/Basket/BasKet';
import { AdminRoute } from './AdminRoute';
import { NewStuffPage } from './pages/NewStuffPage/NewStuffPage';
import { StuffPage } from './pages/StuffPage/StuffPage';
import { EditStuffPage } from './pages/StuffPage/EditStuffPage/EditStuffPage';
import { ModeratorRoute } from './ModeratorRoute';
import { SaleStuff } from './pages/SaleStuff/SaleStuff';
import { MyReviews } from './pages/UserPage/MyReviews/MyReviews';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { IsAuthRoute } from './IsAuthRoute';

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
				path: '/stuff/:id',
				// element: <StuffPage />,
				children: [
					{
						index: true,

						element: <StuffPage />,
					},
					{
						path: 'edit',

						element: (
							<ModeratorRoute>
								<EditStuffPage />
							</ModeratorRoute>
						),
					},
				],
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
				element: (
					<AdminRoute>
						<Users />
					</AdminRoute>
				),
			},
			{
				path: '/users/:id',
				element: (
					<IsAuthRoute>
						<UserLayout />
					</IsAuthRoute>
				),
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
				path: '/newStuff',
				element: <NewStuffPage />,
			},
			{
				path: '/basket',
				element: <Basket />,
			},
			{
				path: '/saleStuff',
				element: <SaleStuff />,
			},
			{
				path: '/myReviews',
				element: (
					<IsAuthRoute>
						<MyReviews />
					</IsAuthRoute>
				),
			},
			{
				path: '*',
				element: <NotFoundPage />,
			},
		],
	},
]);

// export const AppRouter = () => {
// 	return <RouterProvider router={router} />;
// };

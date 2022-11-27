import { Routes, Route } from 'react-router-dom';
import { LoginPage, RegisterPage } from '../auth';
import { SurveyRoutes } from '../survey/routes/SurveyRoutes';
import { Home } from '../ui/components/Home';
import { Navbar } from '../ui/components/Navbar';
import { PrivateRoute, PublicRoute } from './';

export const AppRouter = () => {
	return (
		<Routes>
			<Route
				path='/login'
				element={
					<PublicRoute>
						<LoginPage />
					</PublicRoute>
				}
			/>

			<Route
				path='/register'
				element={
					<PublicRoute>
						<RegisterPage />
					</PublicRoute>
				}
			/>

			<Route
				path='/'
				element={
					<PublicRoute>
						<Navbar />
					</PublicRoute>
				}
			>
				<Route index element={<Home />} />
			</Route>

			<Route
				path='/*'
				element={
					<PrivateRoute>
						<SurveyRoutes />
					</PrivateRoute>
				}
			/>

		</Routes>
	);
};

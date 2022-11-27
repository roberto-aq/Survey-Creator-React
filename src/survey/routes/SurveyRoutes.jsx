import { Route, Routes, Navigate } from 'react-router-dom';
import { Navigation, SurveyPage, EditSurveyPage } from '../';
import { CompleteSurveyPage } from '../pages/CompleteSurveyPage';

export const SurveyRoutes = () => {
	return (
		<>
			<Routes>
				<Route path='/surveys' element={<Navigation />}>
					<Route index element={<SurveyPage />} />
					<Route path='edit/:id' element={<EditSurveyPage />} />
					<Route
						path='complete/:id'
						element={<CompleteSurveyPage />}
					/>
					<Route path='*' element={<Navigate to='/surveys' />} />
				</Route>
			</Routes>
		</>
	);
};

import { useParams, Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { SurveyContext } from '../../context/SurveyContext';
import { SurveyComponent } from './Survey';
import { OneSurvey } from '../components/OneSurvey';

export const EditSurveyPage = () => {
	const { surveys } = useContext(SurveyContext);

	const { id } = useParams();

	const [survey] = surveys.filter(
		survey => survey.id === parseInt(id)
	);

	return (
		<>
			<div className='link-survey'>
				<span>Link de encuesta:</span>
				<Link
					to={`/surveys/complete/${survey.id}`}
					id='link'
				>{`http://localhost:3000/surveys/complete/${survey.id}`}</Link>
			</div>
			<SurveyComponent />
		</>
	);
};

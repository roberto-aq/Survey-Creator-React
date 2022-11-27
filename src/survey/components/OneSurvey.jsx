import { useCallback, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SurveyContext } from '../../context/SurveyContext';
import 'survey-core/defaultV2.min.css';
import { StylesManager, Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { TbArrowBackUp } from 'react-icons/tb';

StylesManager.applyTheme('defaultV2');

export const OneSurvey = () => {
	const { id } = useParams();
	const { surveys, handleUpdateSurvey } = useContext(SurveyContext);

	const [survey] = surveys.filter(
		survey => survey.id === parseInt(id)
	);

	const surveyJson = {
		elements: survey?.questions[0]?.elements,
	};

	const Onesurvey = new Model(surveyJson);
	const alertResults = useCallback(sender => {
		handleUpdateSurvey(
			parseInt(id),
			survey.questions,
			survey.name,
			survey.schema,
			[...survey.responses, sender.data]
		);
	}, []);
	Onesurvey.onComplete.add(alertResults);
	console.log(localStorage.getItem('results_survey'));

	// console.log(survey);
	// console.log(survey?.questions[0]?.elements);

	return (
		<div className='container-survey-complete'>
			<Link to={`/surveys/edit/${survey.id}`} className='btn-back'>
				<TbArrowBackUp />
				Regresar
			</Link>
			<h1 className='title-survey'>{survey.name}</h1>
			<Survey model={Onesurvey} />
		</div>
	);
};

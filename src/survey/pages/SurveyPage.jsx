import { useContext } from 'react';
import { CreateSurvey, SurveyList } from '../';
import { SurveyContext } from '../../context/SurveyContext';

export const SurveyPage = () => {
	const { surveys } = useContext(SurveyContext);

	return <>{surveys.length ? <SurveyList /> : <CreateSurvey />}</>;
};

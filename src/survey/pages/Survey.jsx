import {
	SurveyCreatorComponent,
	SurveyCreator,
} from 'survey-creator-react';
import 'survey-core/defaultV2.min.css';
import 'survey-creator-core/survey-creator-core.min.css';
import { useContext } from 'react';
import { SurveyContext } from '../../context/SurveyContext';
import { useParams } from 'react-router-dom';

const creatorOptions = {
	showLogicTab: false,
	isAutoSave: true,
	showJSONEditorTab: false,
};

export function SurveyComponent() {
	// Context API
	const { id } = useParams();
	const { surveys, handleUpdateSurvey } = useContext(SurveyContext);

	const [survey] = surveys.filter(
		survey => survey.id === parseInt(id)
	);

	//
	const creator = new SurveyCreator(creatorOptions);
	creator.text = JSON.stringify(survey.schema);

	creator.survey.title = survey.name;

	creator.saveSurveyFunc = (saveNo, callback) => {
		handleUpdateSurvey(
			parseInt(id),
			creator.JSON.pages || [],
			creator.JSON.title,
			creator.JSON,
			[]
		);
		callback(saveNo, true);
	};

	return <SurveyCreatorComponent creator={creator} />;
}

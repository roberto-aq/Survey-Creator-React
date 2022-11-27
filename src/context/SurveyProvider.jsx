import { useEffect, useReducer, useState } from 'react';
import { surveyReducer } from '../surveyReducer';
import { SurveyContext } from './SurveyContext';

export const SurveyProvider = ({ children }) => {
	const initialStateSurveys = [];

	const init = () => {
		return JSON.parse(localStorage.getItem('surveys')) || [];
	};

	const [survey, setSurvey] = useState({});
	const [nameSurvey, setNameSurvey] = useState('');
	const [options, setOptions] = useState([
		{
			name: 'Opción 1',
		},
		{
			name: 'Opción 2',
		},
	]);

	const [surveys, dispatch] = useReducer(
		surveyReducer,
		initialStateSurveys,
		init
	);

	useEffect(() => {
		localStorage.setItem('surveys', JSON.stringify(surveys));
	}, [surveys]);

	// Funciones para Añadir y eliminar Encuestas (Reducers Handlers)
	const handleAddSurvey = survey => {
		const action = {
			type: 'Add Survey',
			payload: survey,
		};

		dispatch(action);
	};

	const handleDeleteSurvey = id => {
		const action = {
			type: 'Delete Survey',
			payload: id,
		};

		dispatch(action);
	};

	const handleUpdateSurvey = (
		id,
		questions,
		name,
		schema,
		responses
	) => {
		const action = {
			type: 'Update Survey',
			payload: {
				id,
				questions,
				name,
				schema,
				responses,
			},
		};

		dispatch(action);
	};

	// Función para resetear un input
	const handleResetForm = e => {
		setNameSurvey('');
	};

	return (
		<SurveyContext.Provider
			value={{
				// Handlers Reducers
				handleAddSurvey,
				handleDeleteSurvey,
				handleUpdateSurvey,
				//
				setSurvey,
				survey,
				//
				options,
				setOptions,
				//
				nameSurvey,
				setNameSurvey,
				handleResetForm,
				//
				surveys,
			}}
		>
			{children}
		</SurveyContext.Provider>
	);
};

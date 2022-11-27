import { useContext, useState } from 'react';
import { FaRunning } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { SurveyContext } from '../../context/SurveyContext';

export const CreateSurvey = () => {
	const navigate = useNavigate();

	const {
		handleAddSurvey,
		setSurvey,
		// survey,
		nameSurvey,
		setNameSurvey,
		handleResetForm,
	} = useContext(SurveyContext);

	const onCreateSurvey = e => {
		e.preventDefault();

		if (nameSurvey.length <= 1) return;

		let survey = {
			id: new Date().getTime(),
			name: nameSurvey,
			dateCreation: new Date().toDateString().slice(4),
			questions: [],
			status: 'active',
			responses: [],
			schema: {},
		};

		handleAddSurvey(survey);
		setSurvey(survey);
		navigate(`/surveys/${survey.id}`, {
			replace: true,
		});

		handleResetForm();
	};

	return (
		<main className='main-logged'>
			<h1>
				!Bienvenido al Software de Participación
				<br />
				Electrónica!
			</h1>

			<div className='container-create-quiz'>
				<FaRunning className='icon-running' />

				<div className='info-create-quiz'>
					<p>¡Empezar es fácil! Crea tu primera encuesta ahora</p>

					<form onSubmit={onCreateSurvey}>
						<input
							type='text'
							name=''
							value={nameSurvey}
							id='name-quiz'
							placeholder='Nombra tu encuesta'
							onChange={e => setNameSurvey(e.target.value)}
						/>

						<button type='submit'>Crear Encuesta</button>
					</form>
					<p id='parrafo-name'></p>
				</div>
			</div>
		</main>
	);
};

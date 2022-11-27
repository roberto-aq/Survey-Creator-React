import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SurveyContext } from '../../context/SurveyContext';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

export const SurveyList = () => {
	const {
		surveys,
		nameSurvey,
		setNameSurvey,
		setSurvey,
		handleAddSurvey,
		handleDeleteSurvey,

		handleResetForm,
	} = useContext(SurveyContext);

	const [hidden, setHidden] = useState(true);
	const navigate = useNavigate();

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
		navigate(`/surveys/edit/${survey.id}`, {
			replace: true,
		});

		handleResetForm();
	};

	const onUpdateSurvey = id => {
		navigate(`/surveys/edit/${id}`, {
			replace: true,
		});
	};

	return (
		<main className='main-my-quiz'>
			<h2>Mis Encuestas</h2>

			<div className='container-create-survey'>
				<div
					className={`container-form-survey ${
						hidden ? 'hidden-form' : ''
					}`}
				>
					<form
						className=' form-survey-list'
						onSubmit={onCreateSurvey}
					>
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
					<div
						className='close-btn'
						onClick={() => {
							setHidden(true);
						}}
					>
						<AiOutlineClose />
					</div>
				</div>

				<button
					onClick={() => {
						setHidden(false);
					}}
					className={`add-quiz ${!hidden ? 'hidden-add-quiz' : ''}`}
				>
					<AiOutlinePlus /> Nueva Encuesta
				</button>
			</div>

			<div className='list-quiz'>
				<div className='li-quiz li-quiz-title'>
					<span className='title'>Nombre de la Encuesta</span>
					<span className='create'>Creado</span>
					<span className='modified'>N° Preguntas</span>
					<span className='status'>Estado</span>
					<span className='response'>Respuestas</span>
				</div>

				{surveys.map(survey => (
					<div key={survey.id} className='li-quiz li-quiz-info'>
						<span className='title'>
							<Link to={`/surveys/edit/${survey.id}`}>
								{survey.name}
							</Link>
						</span>
						<span className='create'>{survey.dateCreation}</span>
						<span className='modified'>
							{survey?.questions.length}
						</span>
						<span className='status'>{survey.status}</span>
						<span className='response'>{survey?.responses.length || 0}</span>
						<span
							className='edit'
							onClick={() => onUpdateSurvey(survey.id)}
						>
							<FaEdit />
							Editar
						</span>
						<span
							className='delete'
							onClick={() => handleDeleteSurvey(survey.id)}
						>
							<FaTrashAlt />
							Borrar
						</span>
					</div>
				))}
			</div>
		</main>
	);
};

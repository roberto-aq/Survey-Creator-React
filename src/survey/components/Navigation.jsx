import React, { useContext } from 'react';
import {
	Link,
	Outlet,
	useLocation,
	useNavigate,
	useParams,
} from 'react-router-dom';
import { SurveyContext } from '../../context/SurveyContext';
import { BiChevronRight } from 'react-icons/bi';
import { AuthContext } from '../../context/AuthContext';

export const Navigation = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { id } = useParams();

	// console.log(params, location.pathname)
	const { surveys } = useContext(SurveyContext);
	const { name, handleLogout } = useContext(AuthContext);

	const [survey] = surveys.filter(survey => survey.id == id);

	const onLogout = () => {
		handleLogout();

		navigate('/login', {
			replace: true,
		});
	};

	return (
		<>
			<header className='header-logged'>
				<div className='header-quiz'>
					<span className='quizs'>Encuestas</span>
					{location.pathname === `/surveys/edit/${id}` ? (
						<>
							<Link className='my-quiz' to='/surveys'>
								Mis encuestas
							</Link>
							<BiChevronRight className='icon-right' />
							<span className='title'>{survey?.name}</span>
						</>
					) : (
						''
					)}
				</div>

				<div className='container-logout'>
					<div className='container-name-user'>
						<span>{name}</span>
					</div>
					<button onClick={onLogout} className='btn-logout'>
						Cerrar Sesión
					</button>
				</div>
			</header>

			<Outlet />
		</>
	);
};

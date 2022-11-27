import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logoUleamReporte.png';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useForm } from '../hooks/useForm';
import { BiError } from 'react-icons/bi';

export const FormLogin = () => {
	const [active, setActive] = useState(false);
	const [type, setType] = useState('password');
	const [message, setMessage] = useState('');

	const navigate = useNavigate();

	const { email, password, onResetForm, onInputChange } = useForm({
		email: '',
		password: '',
	});

	const { handleLogin } = useContext(AuthContext);

	let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	let regexPassword =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;

	const onLogin = e => {
		e.preventDefault();

		if (
			regexEmail.test(email) &&
			email.includes('uleam.edu.ec') &&
			regexPassword.test(password)
		) {
			let data = {
				email,
				password,
			};

			handleLogin(email, data);

			navigate('/surveys', {
				replace: true,
			});
			onResetForm();
		} else {
			setMessage('Email o Contraseña no validos');
		}
	};

	const onShowPassword = e => {
		console.log(e.target.parentElement);
		if (type === 'password') {
			setType('text');
			setActive(true);
		} else {
			setType('password');
			setActive(false);
		}
	};

	return (
		<>
			<div className='wrapper'>
				<div className='main-login'>
					<div className='container-login'>
						<div className='container-img'>
							<Link to='/'>
								<img src={Logo} alt='Logo' />
							</Link>
						</div>

						<form onSubmit={onLogin} id='form-login'>
							<h1>Iniciar sesión</h1>

							<div className='form-group'>
								<input
									type='email'
									id='email-login'
									required
									placeholder='Correo'
									name='email'
									value={email}
									onChange={onInputChange}
								/>
								<p className='parrafo-email hidden'></p>
							</div>

							<div className='form-group'>
								<input
									type={type}
									name='password'
									value={password}
									onChange={onInputChange}
									id='password-login'
									required
									placeholder='Contraseña'
								/>
								<div id='btn-hide-show' onClick={onShowPassword}>
									<AiFillEyeInvisible
										style={{
											display: `${active ? 'none' : 'block'}`,
										}}
									/>
									<AiFillEye
										style={{
											display: `${active ? 'block' : 'none'}`,
										}}
									/>
								</div>
							</div>
							<p className='parrafo-password-info'>
								Utiliza ocho carácteres como mínimo con una
								combinación de letras, números y símbolos
							</p>

							<p
								className='parrafo-password'
								style={{
									opacity: `${message.length ? '100' : '0'}`,
								}}
							>
								<BiError />
								{message}
							</p>

							<button type='submit'>Iniciar sesión</button>
							<p className='parrafo-create-account'>
								¿Eres nuevo?
								<Link to='/register'>Crea una cuenta</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

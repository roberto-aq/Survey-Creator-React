import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logoUleamReporte.png';
import { AuthContext } from '../../context/AuthContext';
import { useForm } from '../hooks/useForm';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { BiError } from 'react-icons/bi';

export const FormRegister = () => {
	const [active, setActive] = useState(false);
	const [type, setType] = useState('password');
	const [message, setMessage] = useState('');

	const navigate = useNavigate();

	const { handleRegister } = useContext(AuthContext);

	const {
		firstName,
		lastName,
		email,
		password,
		onInputChange,
		onResetForm,
	} = useForm({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	});

	let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	let regexPassword =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;

	const onRegister = e => {
		e.preventDefault();

		if (
			regexEmail.test(email) &&
			email.includes('uleam.edu.ec') &&
			regexPassword.test(password)
		) {
			let data = {
				email,
				password,
				lastName,
			};

			handleRegister(firstName, data);

			navigate('/surveys', {
				replace: true,
			});

			onResetForm();
		} else {
			setMessage(` Email o Contraseña no validos`);
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
		<div className='wrapper'>
			<div className='main-login'>
				<div className='container-login'>
					<div className='container-img'>
						<Link to='/'>
							<img src={Logo} alt='Logo' />
						</Link>
					</div>

					<form onSubmit={onRegister} id='form-registro'>
						<h1>Registrarse</h1>

						<div className='form-group'>
							<input
								name='firstName'
								value={firstName}
								onChange={onInputChange}
								type='text'
								placeholder='Nombre'
								id='nombre-registro'
								required
							/>
						</div>

						<div className='form-group'>
							<input
								name='lastName'
								value={lastName}
								onChange={onInputChange}
								type='text'
								placeholder='Apellido'
								id='apellido-registro'
								required
							/>
						</div>

						<div className='form-group'>
							<input
								name='email'
								value={email}
								onChange={onInputChange}
								type='email'
								id='email-registro'
								required
								placeholder='Correo'
							/>
							<p className='parrafo-email hidden'></p>
						</div>

						<div className='form-group'>
							<input
								name='password'
								value={password}
								onChange={onInputChange}
								type={type}
								id='password-registro'
								required
								placeholder='Contraseña'
							/>
							<div id='btn-hide-show' onClick={onShowPassword}>
								<AiFillEyeInvisible
									style={{ display: `${active ? 'none' : 'block'}` }}
								/>
								<AiFillEye
									style={{ display: `${active ? 'block' : 'none'}` }}
								/>
							</div>
						</div>
						<p className='parrafo-password-info'>
							Utiliza ocho carácteres como mínimo con una combinación
							de letras, números y símbolos
						</p>

						<p
							className='parrafo-password'
							style={{
								opacity: `${message.length ? '100' : '0'}`,
							}}
						>
							<BiError/>
							{message}
						</p>

						<button type='submit'>Registrarse</button>
						<p className='parrafo-already-account'>
							Ya tengo una cuenta
							<Link to='/login'>Iniciar sesión</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
};

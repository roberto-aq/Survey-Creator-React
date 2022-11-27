import { useReducer, useState } from 'react';
import { AuthReducer } from '../auth/AuthReducer';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
	const initialState = {
		logged: false,
		name: '',
		data: {
			email: '',
			password: '',
			lastName: '',
		},
	};

	const init = () => {
		return JSON.parse(localStorage.getItem('user'));
	};

	const [authState, dispatch] = useReducer(
		AuthReducer,
		initialState,
		init
	);
	const [users, setUsers] = useState([]);

	// ---------
	const handleLogin = (name, data) => {
		const action = {
			type: 'Login',
			payload: {
				name,
				data,
			},
		};

		localStorage.setItem(
			'user',
			JSON.stringify({
				logged: true,
				name: action.payload.name,
				data: action.payload.data,
			})
		);

		dispatch(action);
	};

	const handleRegister = (name, data) => {
		const action = {
			type: 'Register',
			payload: {
				name,
				data,
			},
		};

		localStorage.setItem(
			'user',
			JSON.stringify({
				logged: true,
				name: action.payload.name,
				data: action.payload.data,
			})
		);

		dispatch(action);
	};

	const handleLogout = () => {
		localStorage.removeItem('user');

		const action = {
			type: 'Logout',
		};
		dispatch(action);
	};

	return (
		<AuthContext.Provider
			value={{
				...authState,
				// Methods
				handleLogin,
				handleRegister,
				handleLogout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

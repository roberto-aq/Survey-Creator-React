import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Logo from '../../assets/logoUleamReporte.png';

export const Navbar = () => {
	return (
		<>
			<header className='header-index'>
				<div className='container-logo'>
					<img src={Logo} alt='logo' className='logo' />
				</div>

				<nav className='navigation'>
					<div>
						<NavLink to='/login' className='btn-login'>
							Iniciar Sesión
						</NavLink>
						<NavLink to='/register' className='btn-signup'>
							Registrarse
						</NavLink>
					</div>
				</nav>
			</header>

            <Outlet />
		</>
	);
};

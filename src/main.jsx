import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import { SurveyProvider } from './context/SurveyProvider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<SurveyProvider>
					<App />
				</SurveyProvider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
);

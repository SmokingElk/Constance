import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App.jsx'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';
import { getJWT, resetJWT } from './global_logic/userEnter.js';

/*
Рендер интерфейса на страницу.
 */ 

window.store = store;
window.resetJWT = resetJWT;
window.getJWT = getJWT;
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
);

reportWebVitals();

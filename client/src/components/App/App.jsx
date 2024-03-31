import AdvertisementContainer from '../Advertisement/AdvertisementContainer';
import LoginContainer from '../Login/LoginContainer';
import SignupContainer from '../Signup/SignupContainer';
import classes from './App.module.css';
import { Route, Routes } from 'react-router-dom';

const App = props => {
	return (
		<div className={classes.app}>
			<Routes>
				<Route path="/login" element={<LoginContainer />} />
				<Route path="/sign_up" element={<SignupContainer />} />
			</Routes>

			<AdvertisementContainer />
		</div>
	);
}

export default App;

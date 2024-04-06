import AdvertisementContainer from '../Advertisement/AdvertisementContainer';
import Header from '../Header/Header';
import HeaderContainer from '../Header/HeaderContainer';
import LoginContainer from '../Login/LoginContainer';
import MyProfileContainer from '../MyProfile/MyProfileContainer';
import SignupContainer from '../Signup/SignupContainer';
import classes from './App.module.css';
import { Route, Routes } from 'react-router-dom';

const App = props => {
	return (
		<div className={classes.app}>
			<HeaderContainer />

			<Routes>
				<Route path="/login" element={<LoginContainer />} />
				<Route path="/sign_up" element={<SignupContainer />} />
				<Route path="/profile" element={<MyProfileContainer />} />
			</Routes>

			<AdvertisementContainer />
		</div>
	);
}

export default App;

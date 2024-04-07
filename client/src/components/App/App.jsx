import AdvertisementContainer from '../Advertisement/AdvertisementContainer';
import Background from '../Background/Background';
import Header from '../Header/Header';
import HeaderContainer from '../Header/HeaderContainer';
import LoginContainer from '../Login/LoginContainer';
import MyProfileContainer from '../MyProfile/MyProfileContainer';
import SignupContainer from '../Signup/SignupContainer';
import WatchProfileContainer from '../WatchProfile/WatchProfileContainer';
import classes from './App.module.css';
import { Route, Routes } from 'react-router-dom';

const App = props => {
	return (
		<div className={classes.app}>
			<Background />
			<HeaderContainer />

			<Routes>
				<Route path="/login" element={<LoginContainer />} />
				<Route path="/sign_up" element={<SignupContainer />} />
				<Route exact path="/profile" element={<MyProfileContainer />} />
				<Route exact path="/profile/:userId" element={<WatchProfileContainer />} />
			</Routes>
		
			<AdvertisementContainer />
		</div>
	);
}

export default App;

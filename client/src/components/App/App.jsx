import AdvertisementContainer from '../Advertisement/AdvertisementContainer';
import Background from '../Background/Background';
import HeaderContainer from '../Header/HeaderContainer';
import LoginContainer from '../Login/LoginContainer';
import MyProfileContainer from '../MyProfile/MyProfileContainer';
import Properties from '../Properties/Properties';
import SearchContainer from '../Search/SearchContainer';
import SignupContainer from '../Signup/SignupContainer';
import WatchProfileContainer from '../WatchProfile/WatchProfileContainer';
import classes from './App.module.css';
import { Route, Routes } from 'react-router-dom';

const App = props => {
	return (
		<div className={classes.app}>
			<Background />
			<HeaderContainer />
			<div className={classes.content}>
				<Routes>
					<Route path="/login" element={<LoginContainer />} />
					<Route path="/sign_up" element={<SignupContainer />} />
					<Route path="/properties/preferences" element={<Properties showPreferences={true}/>} />
					<Route path="/properties/characteristics" element={<Properties showPreferences={false}/>} />
					<Route exact path="/profile" element={<MyProfileContainer />} />
					<Route exact path="/profile/:userId" element={<WatchProfileContainer />} />
					<Route path="/search" element={<SearchContainer />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;

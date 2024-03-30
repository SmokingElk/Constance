import Advertisement from '../Advertisement/Advertisement';
import AdvertisementContainer from '../Advertisement/AdvertisementContainer';
import LoginContainer from '../Login/LoginContainer';
import classes from './App.module.css';
import { Route, Routes } from 'react-router-dom';

const App = props => {
	return (
		<div className={classes.app}>
			<Routes>
				<Route path="/auth" element={<LoginContainer />} />
			</Routes>

			<AdvertisementContainer />
		</div>
	);
}

export default App;

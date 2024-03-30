import Advertisement from '../Advertisement/Advertisement';
import AdvertisementContainer from '../Advertisement/AdvertisementContainer';
import classes from './App.module.css';

const App = props => {
	return (
		<div className={classes.app}>
			<AdvertisementContainer />
		</div>
	);
}

export default App;

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';
import Signin from './Signin';
import Dash from './Dash';
import TuneJam from './TuneJam-Container';

const Forofor = () => <h1>oh no</h1>;

const App = () => (
	<BrowserRouter>
		<Provider store={store}>
			<div className="app">
				<Switch>
					<Route path="/signin" component={Signin} />
					<Route path="/dash/:email" component={Dash} />
					<Route path="/tuneJam" component={TuneJam} />
					<Route component={Forofor} />
				</Switch>
			</div>
		</Provider>
	</BrowserRouter>
);

export default App;

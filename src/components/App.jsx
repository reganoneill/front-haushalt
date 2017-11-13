import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';
import Signin from './Signin';
// import Dash from './Dash';

const Forofor = () => <h1>oh no</h1>;

const App = () => (
	<BrowserRouter>
		<Provider store={store}>
			<div className="app">
				<Switch>
					<Route path="/signin" component={Signin} />
					<Route component={Forofor} />
				</Switch>
			</div>
		</Provider>
	</BrowserRouter>
);

export default App;

import { useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Signin from './components/Signin/Signin';
import Admin from './components/Admin/Admin';

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path={'/'} component={Signin} />
					<Route exact path={'/admin'} component={Admin} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;

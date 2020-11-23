import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Layout from 'components/layout';

import pages from './pages';

function FourOhFour({ location }) {
	return (
		<div className="not-found">
			<h3>
				No match for <code>{location.pathname}</code>
			</h3>
		</div>
	);
}

const Routes = () => {
	const routes = pages.map(page => <Route key={page.path} exact={true} strict={true} path={page.path} component={page.component} />);
	return (
		<Router>
			<Layout>
				<Switch>
					{routes}
					<Route component={ FourOhFour } />
				</Switch>
			</Layout>
		</Router>
	);
}

export default Routes;
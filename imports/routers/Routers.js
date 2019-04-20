import { Tracker } from "meteor/tracker";
import { Meteor } from "meteor/meteor";
import React from "react";
import { Router, Route, Switch } from "react-router";
import { createBrowserHistory } from "history";

import App from "../ui/App.jsx";
import NotFound from "../ui/NotFound.jsx";
import SearchingHistory from "../ui/SearchingHistory.jsx";

const browserHistory = createBrowserHistory();
const authPages = ["/history"];

// Tracking auth status
const authStatus = isLoggedin => {
	// get the current location
	const pathname = browserHistory.location.pathname;

	const isAuthPage = authPages.includes(pathname);

	// if user on an authenticated page but not logged in, redirect to /
	if (isAuthPage && !isLoggedin) {
		browserHistory.replace("/");
	}
};

// routers
export const renderRoutes = () => (
	<Router history={browserHistory}>
		<Switch>
			<Route exact path="/" component={App} />
			<Route exact path="/history" component={SearchingHistory} />
			<Route component={NotFound} />
		</Switch>
	</Router>
);


Tracker.autorun(() => {
	const isLoggedin = !!Meteor.userId();
	authStatus(isLoggedin);
});
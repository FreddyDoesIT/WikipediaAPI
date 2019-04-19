import React, { Component } from "react";
import Search from "./Search.jsx";

export default class App extends Component {
	render() {
		return (
			<div>
				<h1>Welcome to Wiki Search!</h1>
				<Search />
			</div>
		);
	}
}


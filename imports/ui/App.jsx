import React, { Component } from "react";
import Search from "./Search.jsx";
// import SearchingHistory from "./SearchingHistory.jsx";
import { Container } from "semantic-ui-react";
export default class App extends Component {
	render() {
		return (
			<Container>
				<h1>Welcome to Wiki Search!</h1>
				<Search />
			</Container>
		);
	}
}


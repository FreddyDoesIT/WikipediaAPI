import React, { Component } from "react";
import Search from "./Search.jsx";
import { Container } from "semantic-ui-react";
export default class App extends Component {
	render() {
		return (
			<Container>
				<div>
					<img src="/Wikipedia-logo-en-big.png" alt="wiki logo" height="45" width="42"/>
					<h1>Welcome to Wiki Search!</h1>
				</div>
				
				<Search />
			</Container>
		);
	}
}


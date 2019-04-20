import React, { Component } from "react";
import Search from "./Search.jsx";
import { Container, Button } from "semantic-ui-react";
import { Accounts } from "meteor/accounts-base";
import Login from "./Login.jsx";
// import { Meteor } from "meteor/meteor";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedin: false
		};
		this.loginRef = React.createRef();
	}

	onLogout() {
		Accounts.logout();
	}

	handleClick() {
		this.loginRef.current.openModal();
	}

	displayLogout() {
		return (
			<Button
				floated="right"
				color="blue"
				onClick={this.onLogout.bind(this)}
			>
				log out
			</Button>
		);
	}

	render() {
		return (
			<Container>
				<div>
					<h1 className="title">
						<img
							src="/Wikipedia-logo-en-big.png"
							alt="wiki logo"
							height="50"
							width="42"
						/>
						&nbsp; &nbsp; Welcome to Wiki Search!
						<Button
							floated="right"
							color="red"
							onClick={this.handleClick.bind(this)}
						>
							log in
						</Button>
						<Login ref={this.loginRef} />
						{this.displayLogout()}
						<Button floated="right" color="green">
							My History
						</Button>
					</h1>
				</div>

				<Search />
			</Container>
		);
	}
}

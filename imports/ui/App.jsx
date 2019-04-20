import React, { Component } from "react";
import Search from "./Search.jsx";
import { Container, Button, Menu, Image, Header } from "semantic-ui-react";
import { Accounts } from "meteor/accounts-base";
import Login from "./Login.jsx";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";

class App extends Component {
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

	displayLogin() {
		return (
			<Menu.Item>
				<Button
					color="blue"
					className="hvr-ripple-out"
					onClick={this.handleClick.bind(this)}
				>
					Log In
				</Button>
				<Login ref={this.loginRef} />
			</Menu.Item>
		);
	}

	displayLogout() {
		return (
			<Menu.Item>
				<Button
					color="blue"
					className="hvr-ripple-out"
					onClick={this.onLogout.bind(this)}
				>
					Log out
				</Button>

				<Menu.Menu>
					<Menu.Item>
						<Button color="red" className="hvr-ripple-out" icon>
							My History
						</Button>
					</Menu.Item>
				</Menu.Menu>
			</Menu.Item>
		);
	}

	render() {
		return (
			<Container>
				<Menu secondary className="title">
					<Menu.Item>
						<Image
							src="/Wikipedia-logo-en-big.png"
							size="tiny"
							alt="wiki logo"
						/>
						&nbsp;&nbsp;&nbsp; 

						<Header as="h1">Welcome to Wiki Search!</Header>
					</Menu.Item>

					<Menu.Menu position="right">
						{Meteor.user() ? "" : this.displayLogin()}
						{this.props.user ? this.displayLogout() : ""}
					</Menu.Menu>
				</Menu>

				<Search />
			</Container>
		);
	}
}

App.propTypes = {
	user: PropTypes.bool.isRequired
};

export default withTracker(() => {
	return {
		user: !!Meteor.user()
	};
})(App);

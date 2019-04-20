import React, { Component } from "react";
import { Input, Form, Button } from "semantic-ui-react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { searchedHistory } from "../api/searchedHistory";
import PropTypes from "prop-types";

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchingContent: "",
			contentFromAPI: "",
			title: "",
			links: "",
			display: "",
			history: [],
			err: ""
		};
	}

	onFormSubmit(event) {
		event.preventDefault();

		let historyUpdate = this.state.history.slice();
		historyUpdate.push(this.state.searchingContent);

		Meteor.call(
			"getDataFromAPI",
			this.state.searchingContent,
			(err, data) => {
				if (err) {
					this.setState({ err });
					console.log(this.state.searchingContent);
					console.log(this.state.err);
					return;
				}
				this.setState({
					title: data.title,
					links: data.links.slice(0, 100),
					display: data.text["*"],
					history: historyUpdate
				});
			}
		);

		Meteor.call(
			"searchedHistory.insert",
			this.state.searchingContent,
			err => {
				if (err) {
					this.setState({ err });
					console.log(this.state.searchingContent);
					console.log(this.state.err);
					return;
				}

				this.setState({
					error: ""
				});
			}
		);
	}

	handleClick(value) {
		event.preventDefault();

		let historyUpdate = this.state.history.slice();
		historyUpdate.push(value);

		Meteor.call("getDataFromAPI", value, (err, data) => {
			if (err) {
				this.setState({ err });
				console.log(this.state.buttonValue);
				console.log(this.state.err);
				return;
			}
			this.setState({
				title: data.title,
				links: data.links.slice(0, 100),
				display: data.text["*"],
				history: historyUpdate
			});
		});

		Meteor.call("searchedHistory.insert", value, err => {
			if (err) {
				this.setState({ err });
				console.log(this.state.searchingContent);
				console.log(this.state.err);
				return;
			}

			this.setState({
				error: ""
			});
		});
	}

	searchBar() {
		return (
			<Form onSubmit={this.onFormSubmit.bind(this)}>
				<Form.Field>
					<Input
						id="searchBar"
						type="text"
						value={this.state.searchingContent}
						onChange={e =>
							this.setState({ searchingContent: e.target.value })
						}
						icon="search"
						placeholder="Search..."
						aria-label="search"
					/>
				</Form.Field>
			</Form>
		);
	}

	history() {
		return this.state.history.map((data, index) => (
			<Button
				size="mini"
				basic
				className="hvr-grow-shadow"
				key={index}
				onClick={e => this.handleClick(e.target.value)}
				onChange={e =>
					this.setState({ searchingContent: e.target.value })
				}
				value={data.searchedHistory}
			>
				{data}
			</Button>
		));
	}

	links() {
		return this.state.links
			? this.state.links.map((data, index) => (
					<Button
						size="mini"
						basic
						className="hvr-grow-shadow"
						key={index}
						onClick={e => this.handleClick(e.target.value)}
						onChange={e =>
							this.setState({ searchingContent: e.target.value })
						}
						value={data["*"]}
					>
						{data["*"]}
					</Button>
			  ))
			: "";
	}

	content() {
		return (
			<span className="contentFromWiki" dangerouslySetInnerHTML={{ __html: this.state.display }} />
		);
	}

	render() {
		return (
			<div>
				{this.searchBar()}
				<br />
				<br />
				<h1>History</h1>
				{this.history()}
				<br />
				<br />
				<h1>Links</h1>
				{this.links()}
				<br />
				<br />
				<h1>Content</h1>
				{this.content()}
			</div>
		);
	}
}

Search.propTypes = {
	searchingLogs: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withTracker(() => {
	const handle = Meteor.subscribe("searchedHistory");

	return {
		searchingLogs: searchedHistory.find({}).fetch(),
		ready: handle.ready()
	};
})(Search);

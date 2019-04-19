import React, { Component } from "react";
import { Input, Form } from "semantic-ui-react";
import { Meteor } from "meteor/meteor";
// import PropTypes from "prop-types";

export default class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchingContent: "",
			contentFromAPI: "",
			title: "",
			links: "",
			display: "",
			err: ""
		};
	}

	onFormSubmit(event) {
		event.preventDefault();

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

				console.log("got data", data);

				this.setState({
					title: data.title,
					links: data.links,
					display: data.text
				});
			}
		);
	}

	searchBar() {
		return (
			<Form onSubmit={this.onFormSubmit.bind(this)}>
				<Form.Field>
					<Input
						id="searchBar"
						type="text"
						value={this.state.word}
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
		return this.state.title ? (
			<button className="title">{this.state.title}</button>
		) : (
			""
		);
	}

	links() {
		return this.state.links
			? this.state.links.map(data => (
					<button className="linkName">{data["*"]}</button>
			  ))
			: "";
	}

	content() {
		return (
			<span dangerouslySetInnerHTML={{ __html: this.state.display["*"] }} />
		);
	}

	render() {
		return (
			<div>
				{this.searchBar()}
				<h1>History</h1>
				{this.history()}
				<h1>Links</h1>
				{this.links()}
				<h1>Content</h1>
				{this.content()}
			</div>
		);
	}
}

// Search.propTypes = {
// 	// param: PropTypes.string.isRequired
// };

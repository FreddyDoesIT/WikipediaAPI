import React, { Component } from "react";
import { Input, Form } from "semantic-ui-react";
import { Meteor } from "meteor/meteor";

export default class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchingContent: "",
			contentFromAPI: "",
			title: "",
			links: "",
			display: "",
			buttonValue: "",
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
				this.setState({
					title: data.title,
					links: data.links.slice(0, 100),
					display: data.text["*"]
				});
			}
		);
	}

	handleClick(value) {
		event.preventDefault();

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
				display: data.text["*"]
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
		return this.state.title ? (
			<button className="hvr-grow-shadow">{this.state.title}</button>
		) : (
			""
		);
	}

	links() {
		return this.state.links
			? this.state.links.map((data, index) => (
					<button
						className="hvr-grow-shadow"
						key={index}
						onClick={e => this.handleClick(e.target.value)}
						// onChange={e =>
						// 	this.setState({ buttonValue: e.target.value })
						// }
						value={data["*"]}
					>
						{data["*"]}
					</button>
			  ))
			: "";
	}

	content() {
		return (
			<span dangerouslySetInnerHTML={{ __html: this.state.display }} />
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

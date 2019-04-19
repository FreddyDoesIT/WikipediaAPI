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
			err: ""
		};
	}

	onFormSubmit(event) {
		event.preventDefault();

		Meteor.call("getDataFromAPI", this.state.searchingContent, (err, data) => {
			if (err) {
				this.setState({ err });
				console.log(this.state.searchingContent);
				console.log(this.state.err);
				return;
			}

			console.log("got data", data);

			// this.setState({
			// 	// content:data
			// });
		});


		// this.props.onSubmit(this.state.word);
	}

	render() {
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
}

// Search.propTypes = {
// 	// param: PropTypes.string.isRequired
// };

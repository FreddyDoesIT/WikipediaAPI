import React, { Component } from "react";
import { searchedHistory } from "../api/searchedHistory.js";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Button, Container, Grid } from "semantic-ui-react";
import PropTypes from "prop-types";

class SearchingHistory extends Component {
	renderHistory() {
		return this.props.history.map((data, index) => (
			<Button size="mini" basic className="hvr-grow-shadow" key={index}>
				{data.searchedHistory}
			</Button>
		));
	}

	render() {
		return (
			<Container>
				<h2> My History</h2>
				<Grid.Row columns={5}>
					<Grid.Column>{this.renderHistory()}</Grid.Column>
				</Grid.Row>
			</Container>
		);
	}
}

SearchingHistory.propTypes = {
	history: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withTracker(() => {
	const handle = Meteor.subscribe("searchedHistory");

	return {
		history: searchedHistory
			.find({
				userId: Meteor.userId()
			})
			.fetch(),
		ready: handle.ready()
	};
})(SearchingHistory);

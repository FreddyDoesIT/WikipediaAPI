import React, { Component } from "react";
import { searchedHistory } from "../api/searchedHistory.js";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Button } from "semantic-ui-react";
import PropTypes from "prop-types";

class SearchingHistory extends Component {
	renderHistory() {
		return this.props.history.map(data => (
			<div key={data._id}>
				<Button>{data.searchingHistory}</Button>
			</div>
		));
	}

	render() {
		return (
			<div>
				<h2>History</h2>
				{this.renderHistory()}
			</div>
		);
	}
}
SearchingHistory.propTypes = {
	history: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withTracker(() => {
	const handle = Meteor.subscribe("searchedHistory");
	
	return {
		history: searchedHistory.find({}).fetch(),
		ready: handle.ready()
	};
})(SearchingHistory);

import { Meteor } from "meteor/meteor";
// import axios from "axios";
import { check } from "meteor/check";

let wikipedia = require("node-wikipedia");

if (Meteor.isServer) {
	Meteor.methods({
		getDataFromAPI(param) {
			check(param, String);

			return new Promise((resolve, reject) => {
				wikipedia.page.data(param, { content: true }, resolve);
			});
		}
	});
}

import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Mongo } from "meteor/mongo";

export const searchedHistory = new Mongo.Collection("searchedHistory");

if (Meteor.isServer) {
	Meteor.publish("searchedHistory", function() {
		return searchedHistory.find();
	});

	Meteor.methods({
		"searchedHistory.insert"(searchingContent) {
			check(searchingContent, String);

			// if (!Meteor.userId()) {
			// 	throw new Meteor.Error("not-authorized");
			// }

			searchedHistory.insert({
				searchedHistory: searchingContent
			});
		}
	});
}

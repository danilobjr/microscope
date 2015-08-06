Template.notifications.helpers({
	hasNotifications: function() {
		return Notifications.find().count() > 0;
	},
	notifications: function() {		
		return Notifications.find();
	},
	unseenNotificationsCount: function() {
		return Notifications.find({ seen: false }).count();
	}
});

Template.notifications.events({
	'click [data-toggle=dropdown]': function() {
		Meteor.call('clearNotificationsByUser', Meteor.userId());
	}
});
Notifications = new Meteor.Collection('notifications');

Notifications.allow({
	update: function(userId) {
		return !!userId;
	}
});

Meteor.methods({
	generateNotificationForComment: function(postId, userId) {
		if (!Meteor.user()) {
			throw new Meteor.Error(HttpStatus.notAuthorized,
				'You must be logged in to send a notification');
		}
	
		if (!postId) {
			throw new Meteor.Error();
		}
		
		var newNotification = {
			postId: postId,
			userId: userId,
			commenterId: Meteor.userId(),
			commenterName: Meteor.user().username,
			createdAt: new Date().getTime(),
			seen: false
		};
		
		var notificationId = Notifications.insert(newNotification);		
		
		return notificationId;
	},
	clearNotificationsByUser: function(userId) {
		Notifications.update({ userId: userId }, { $set: { seen: true } });
	}
});
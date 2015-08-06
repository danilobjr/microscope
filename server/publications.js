Meteor.publish('posts', function () {
    return Posts.find();
});

Meteor.publish('comments', function(postId) {
    return Comments.find({ postId: postId });
});

Meteor.publish('notifications', function(userId) {
    console.log(userId);
    return Notifications.find({ userId: userId });
});
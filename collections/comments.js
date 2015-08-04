Comments = new Meteor.Collection('comments');

Meteor.methods({
	insertComment: function(commentProperties) {
		if (!Meteor.user()) {
			throw new Meteor.Error(HttpStatus.notAuthorized, 
				'You need to be logged in to submit a comment');
		}
		
		if (!commentProperties.postId) {
			throw new Meteor.Error(HttpStatus.unprocessableEntity, 
				'You must comment on a post');
		}
		
		if (!commentProperties.body) {
			throw new Meteor.Error(HttpStatus.unprocessableEntity, 
				'Comment text is required');
		}
		
		var newComment = _.extend(commentProperties, {
			body: Meteor.isSimulation ? commentProperties.body + ' Client' : commentProperties.body + ' Server',
			userId: Meteor.userId(),
			author: Meteor.user().username,
			createdAt: new Date().getTime()
		});
		
		var commentId = Comments.insert(newComment);
		
		Posts.update(commentProperties.postId, { $inc: { commentsCount: 1 } })
		
		return commentId;
	}
})
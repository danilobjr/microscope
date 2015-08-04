Posts = new Meteor.Collection('posts');

var postValidation = (function() {
	return {
		validate: validate
	};
	
	function validate(post) {
		var loggedInUser = Meteor.user();
		var postWithSameUrl = Posts.findOne({ url: post.url });
		
		if (!loggedInUser) {
			throw new Meteor.Error(HttpStatus.unauthorized, 
				'You need to login to create new posts');
		}
		
		if (!post.url) {
			throw new Meteor.Error(HttpStatus.unprocessableEntity, 
				'Please fill in the url');
		}
		
		if (!post.title) {
			throw new Meteor.Error(HttpStatus.unprocessableEntity, 
				'Please fill in the title');
		}
		
		if (postWithSameUrl && post._id !== postWithSameUrl._id) {
			throw new Meteor.Error(HttpStatus.found, 
				'This link has already been posted', 
				postWithSameUrl._id);
		}
	}
}());

Posts.allow({
	remove: permissions.ownsDocument
});

Meteor.methods({
	insertPost: function(post) {
		var loggedInUser = Meteor.user();
		
		postValidation.validate(post);
		
		post = _.extend(_.pick(post, 'url', 'title'), {
			userId: loggedInUser._id,
			author: loggedInUser.username,
			createdAt: new Date().getTime()
		});
		
		var postId = Posts.insert(post);
		
		return postId;
	},
	updatePost: function(postAttributes) {		
		var originalPost = Posts.findOne(postAttributes._id);
		
		postAttributes = _.extend(originalPost, postAttributes);		
		postAttributes.updatedAt = new Date().getTime();
		
		postValidation.validate(postAttributes);
		
		var postId = Posts.update(postAttributes._id, { $set: postAttributes });
		
		return postId;
	}
});
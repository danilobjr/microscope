Posts = new Meteor.Collection('posts');

Posts.allow({
	remove: permissions.ownsDocument
});

Meteor.methods({
	insert: function(post) {
		var loggedInUser = Meteor.user();
		var postWithSameUrl = Posts.findOne({ url: post.url });
		
		if (!loggedInUser) {
			throw new Meteor.Error(HttpStatus.unauthorized, 
				'You need to login to create new posts');
		}
		
		if (!post.title) {
			throw new Meteor.Error(HttpStatus.unprocessableEntity, 
				'Please fill in the title');
		}
		
		if (post.url && postWithSameUrl) {
			throw new Meteor.Error(HttpStatus.found, 
				'This link has already been posted', 
				postWithSameUrl._id);
		}
		
		var post = _.extend(_.pick(post, 'url', 'title'), {
			userId: loggedInUser._id,
			author: loggedInUser.username,
			createdAt: new Date().getTime()
		});
		
		var postId = Posts.insert(post);
		
		return postId;
	}
});
Template.postEdit.events({
	'submit form': function(e) {
		e.preventDefault();
		
		alert('form submitted');
	},
	'click #delete-post-button': function(e) {
		e.preventDefault();
		
		if (confirm('Do you really want to remove this post?')) {
			Posts.remove(this._id);
			Router.go('postsList');
		}
	}
});
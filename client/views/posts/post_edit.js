Template.postEdit.events({
	'submit form': function(e) {
		e.preventDefault();
		
		var form = $(e.target);
		
		var postAttributes = {
			_id: this._id,
			url: form.find('[name=url]').val(),
			title: form.find('[name=title]').val()
		};
		
		Meteor.call('updatePost', postAttributes, function(error, result) {
			if (error) {
				alert(error.reason);
			} else {
				alert('Post updated successfully');
			}
		});
	},
	'click #delete-post-button': function(e) {
		e.preventDefault();
		
		if (confirm('Do you really want to remove this post?')) {
			Posts.remove(this._id);
			Router.go('postsList');
		}
	}
});
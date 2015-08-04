Template.postNew.events({
	'submit form': function(e) {
		e.preventDefault();
		
		var form = $(e.currentTarget);
		
		var post = {
			url: form.find('#url').val(),
			title: form.find('#title').val()
		};
		
		Meteor.call('insertPost', post, function(error, id) {
			if (error) {
				return toastr.error(error.reason);
			}
			
			Router.go('postPage', { _id: id });
			toastr.success('Post created');
		});		
	}
});
Template.postNew.events({
	'submit form': function(e) {
		e.preventDefault();
		
		var form = $(e.currentTarget);
		
		var post = {
			url: form.find('#url').val(),
			title: form.find('#title').val()
		};
		
		Meteor.call('insert', post, function(error, id) {
			if (error) {
				return alert(error.reason);
			}
			
			Router.go('postPage', { _id: id });
		});		
	}
});
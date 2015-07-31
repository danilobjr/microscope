Template.postNew.events({
	'submit form': function(e) {
		e.preventDefault();
		
		var form = $(e.currentTarget);
		
		var post = {
			url: form.find('#url').val(),
			title: form.find('#title').val()
		};
		
		post._id = Posts.insert(post);
		
		Router.go('postPage', post);
	}
});
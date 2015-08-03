Template.postEdit.events({
	'submit form': function(e) {
		e.preventDefault();
		
		alert('form submitted');
	},
	'click #delete-post-button': function(e) {
		alert(confirm('Are you sure?'));
	}
});
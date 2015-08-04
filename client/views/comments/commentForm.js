Template.commentForm.events({
	'submit form': function(e) {
		e.preventDefault();
		
		var textarea = $('form').find('textarea');
		
		var commentProperties = {
			body: textarea.val(),
			postId: this._id
		};
		
		Meteor.call('insertComment', commentProperties, function(error, result) {
			if (error) {
				return toastr.warning(error.reason);
			}
			
			textarea.val('');
			toastr.success('Comment submitted');			
		})
	}
});
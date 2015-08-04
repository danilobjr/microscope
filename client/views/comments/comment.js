Template.comment.helpers({
	submittedTime: function() {
		return new Date(this.submitted).toString();
	}
});
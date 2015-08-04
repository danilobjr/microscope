Template.comment.helpers({
	submittedTime: function() {
		return new Date(this.createdAt).toString();
	}
});
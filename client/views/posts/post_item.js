Template.postItem.helpers({
    domain: function() {
        var anchor = document.createElement('a');
        anchor.href = this.url;
        return anchor.hostname;
    },
    currentUserIsOwner: function() {
		return this.userId === Meteor.userId();
	},
    commentsCount: function() {
        return Comments.find({ postId: this._id }).count();
    }
});
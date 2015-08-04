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
        var result = '';
        
        if (!this.commentsCount) { return 'No comments'; }
        if (this.commentsCount === 1) { return '1 comment'; }
        
        return this.commentsCount + ' comments';
    }
});
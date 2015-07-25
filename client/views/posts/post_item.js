Template.postItem.helpers({
    domain: function() {
        var anchor = document.createElement('a');
        anchor.href = this.url;
        console.log(anchor.hostname);
        return anchor.hostname;
    }
});
Router.configure({
    layoutTemplate: 'layout', 
    loadingTemplate: 'loading',
    waitOn: function() { 
        return [
            Meteor.subscribe('posts'), 
            Meteor.subscribe('notifications', Meteor.userId())
        ];
    }
});

Router.map(function () {
    this.route('postsList', { path: '/' });
    this.route('postPage', { 
        path: '/posts/show/:_id',
        waitOn: function() { return Meteor.subscribe('comments', this.params._id); },
        data: function() { return Posts.findOne(this.params._id); } 
    });
    this.route('postNew', { path: '/posts/new' });
    this.route('postEdit', { 
        path: '/posts/:_id/edit',
        data: function() { return Posts.findOne(this.params._id); } 
    });
});

var checkAuthentication = function() {
    if (!Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {            
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
};

Router.onBeforeAction(checkAuthentication, { only: ['postNew', 'postEdit'] });
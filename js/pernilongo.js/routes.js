var Routes = function(options){
    var root = this;
    var vars = { 'path': '', 'data': '' };
    $.extend(vars, options);

    var routes = {
        '^#/submit$' : function(params) {
            HomeController.submitStory(params);
        }, 
        '^#/submitSearch$' : function(params) {
            HomeController.submitSearch(params);
        },        
        '^#/about$' : function(params) {
            HomeController.about(params);
        },
        '^#/stories$' : function(params) {
            StoriesController.index(params);
        },
        '^#/stories/([a-zA-Z0-9-_]+)$' : function(params) {
            StoriesController.show(params);
        },
        '^#/stories/tags/([a-zA-Z0-9-,_]+)$' : function(params) {
            StoriesController.query(params);
        },
        '^$' : function(params) {
            // Default Route
            HomeController.index(params);
        }
    }

    this.render = function(path){
        if(!path){ var path = vars['path']; }
        var match = false;

        $.each(routes, function(key, value){
            var pattern = new RegExp(key);
            if(path.search(pattern) == 0){
                var matches = pattern.exec(path);
                value({
                    'regex' : matches,
                    'data' : vars['data']
                });
                match = true;
                return false;
            }
        });

        return match;
    }
}

// Forward
var forwardTo = function(hash, data){
    render(hash, data);
}

// Redirect
var redirectTo = function(hash, data){
    window.location.hash = hash;
}

// Render page after hash
var render = function (uri, data) {
    var routes = new Routes({
        'path' : uri,
        'data' : data
    });
    if(!routes.render()){
        var error_message = "Page not found.";
        MessageHelper.ErrorMessage.create(error_message);
    }
}

// Whenever the Hash Change, we render again
$(window).on('hashchange', function(){
    render(window.location.hash, null);
});
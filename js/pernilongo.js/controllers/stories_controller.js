var StoriesController = function(){}

StoriesController.index = function(params){
    var stories = Story.find();

    HttpHelper.loadPage({
        'viewUrl' : 'stories/index.html',
        'context' : {'story': stories},
        'complete' : StoriesController.updateMenu
    });
}

StoriesController.query = function(params){
    var query = params['regex'][1];
    var stories = Story.find({ 'tags' : { '$contains' : query.split(",") } });

    HttpHelper.loadPage({
        'viewUrl' : 'stories/index.html',
        'context' : {
            'story': stories,
            'no_results': (stories.length==0),
            'query' : query
        },
        'complete' : StoriesController.updateMenu
    });
}

StoriesController.show = function(params){
    var story_slug = params['regex'][1];
    var stories = Story.find({ slug: story_slug });

    if(stories==[]){
        alert("Story not found")
        return false;
    }

    HttpHelper.loadPage({
        'viewUrl' : 'stories/show.html',
        'context' : {'story': stories[0]},
        'callback' : StoriesController.updateMenu
    });
}

StoriesController.updateMenu = function(jqXHR, textStatus){
   $(".nav").find("li").removeClass("active");
   $("#nav_stories").addClass("active");
}
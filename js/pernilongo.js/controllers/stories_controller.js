var StoriesController = function(){}

function getChunksFrom(stories){
    var stories_in_chunks = [];
    var i,j,temparray,chunk = 3;
    for (i=0,j=stories.length; i<j; i+=chunk) {
        temparray = stories.slice(i,i+chunk);
        stories_in_chunks.push(temparray);
    }
    return stories_in_chunks;
}

StoriesController.index = function(params){
    var stories = Story.find();

    HttpHelper.loadPage({
        'viewUrl' : 'stories/index.html',
        'context' : {'story_chunks': getChunksFrom(stories)},
        'complete' : StoriesController.updateMenu
    });
}

StoriesController.query = function(params){
    var query = params['regex'][1];
    var stories = Story.find({ 'tags' : { '$contains' : query.split(",") } });

    HttpHelper.loadPage({
        'viewUrl' : 'stories/index.html',
        'context' : {
            'story_chunks': getChunksFrom(stories),
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
        'complete' : StoriesController.updateMenu
    });
}

StoriesController.updateMenu = function(jqXHR, textStatus){
   $(".nav").find("li").removeClass("active");
   $("#nav_stories").addClass("active");
}
var HomeController = function(){}

HomeController.index = function(params){
    var stories = Story.find().slice(0,3);

    // Load latest stories
    HttpHelper.loadPage({
        'viewUrl' : 'home/index.html',
        'context' : {
            'story': stories
        },
        'complete' : function(jqXHR, textStatus){
            $(".nav").find("li").removeClass("active");
            $("#nav_home").addClass("active");

            // Set Autocomplete for Search field
            $(".select2").select2({
                placeholder: "Type a story tag (e.g., XSS or SSRF)",
                width: '100%',
                data: choices
            });
        }
    });
}

HomeController.about = function(params){
    HttpHelper.loadPage({
        'viewUrl' : 'home/about.html',
        'complete' : function(jqXHR, textStatus){
            $(".nav").find("li").removeClass("active");
            $("#nav_about").addClass("active");
        }
    });
}

HomeController.submitSearch = function(params){
    var query = decodeURIComponent(params['data']['formData']);
    query = query.replace("search=","");
    query = query.replace("&search=",",");

    if(query == ""){
        redirectTo("#/stories");
    } else {
        redirectTo("#/stories/tags/" + query);
    }
}

HomeController.submitStory = function(params){
    HttpHelper.loadPage({
        'viewUrl' : 'home/submit_story.html'
    });
}
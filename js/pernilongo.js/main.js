$(document).ready(function(){
    // Start DB
    db = new loki('loki.json');
    Story = db.addCollection('story');   
    choices = []; // Store autocomplete values for search

    HttpHelper.loadPage({
        'apiUrl' : 'data.json',
        'complete' : function(jqXHR, textStatus){
            var content = jqXHR.responseJSON;

            for(var i=0;i<content.data.length;i++) {
                var current_element = content.data[i];

                // Insert into Database
                Story.insert(current_element);

                // Register choice
                for(var j=0;j<current_element.tags.length;j++) {
                    var current_tag = current_element.tags[j];
                    choices.push(current_tag);
                }
            }

            // Remove duplicated choices
            choices = jQuery.unique(choices);

            // OnLoad restore from hash
            render(window.location.hash, null);
        }
    });
});
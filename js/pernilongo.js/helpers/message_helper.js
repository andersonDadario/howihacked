var MessageHelper = function(){}

// Alert Divs

MessageHelper.BaseMessage = function(text, style){
    var msg = '<div class="alert" style="'+(style ? style : '')+'">';
    msg += '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
    msg += '<i class="fa sign"></i><strong></strong> <span class="basemessage"></span></div>';
    msg = $(msg);
    msg.find(".basemessage").text(text);

    return msg;
}

MessageHelper.InfoMessage = {
    create: function(text){
        var msg = MessageHelper.BaseMessage(text);
        msg.addClass("alert-info");
        msg.find("i:first").addClass("fa-info-circle");
        msg.find("strong:first").html("Info!");
        currentLayer().prepend(msg);
    }
}

MessageHelper.SuccessMessage = {
    create: function(text){
        var msg = MessageHelper.BaseMessage(text);
        msg.addClass("alert-success");
        msg.find("i:first").addClass("fa-check");
        msg.find("strong:first").html("Success!");
        currentLayer().prepend(msg);
    }
}

MessageHelper.ErrorMessage = {
    create: function(text){
        var msg = MessageHelper.BaseMessage(text);
        msg.addClass("alert-danger");
        msg.find("i:first").addClass("fa-times-circle");
        msg.find("strong:first").html("Error!");
        currentLayer().prepend(msg);
    }
}

// Form
MessageHelper.FormErrorMessage = {
    create: function(responseJSON){
        var text = '<h2>Errors prohibited this form from being submitted:</h2>'
        text = text + '<ul>';
        $.each(Object.keys(responseJSON), function(i, key){
            var beautiful_key = key[0].toUpperCase() + key.substring(1).replace('_',' ');
            $.each(responseJSON[key], function(j, message){
                text = text + '<li>' + beautiful_key + ' ' + message + '</li>';
            });
        });
        text = text + '</ul>';

        var msg = MessageHelper.BaseMessage(text, 'margin: 5% 5% 0 5%');
        msg.addClass("alert-danger");
        msg.find("i:first, strong:first").remove();
        currentLayer().prepend(msg);
    }
}
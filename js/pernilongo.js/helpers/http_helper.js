var HttpHelper = function(){}

HttpHelper.loadPage = function(extended_options){
  var options = {
    'url' : false,
    'apiUrl' : false,
    'viewUrl' : false,
    'context' : false,
    'method' : 'GET',
    'headers' : {},
    'data' : '',
    'replace_element' : conf['deployTarget'],
    'statusCode' : {},
    'success' : function(data, textStatus, jqXHR){
      if(options['context']){
        var template = Handlebars.compile(data);
        var data = template(options['context']);
      }

      $(options['replace_element']).html(data);
    },
    'error' : function(jqXHR, textStatus, errorThrown){
      if(jqXHR.status != "401"){
        MessageHelper.ErrorMessage.create(
          "Error while loading " + path
        );
      }
    },
    'errorEpilogue' : function(jqXHR, textStatus, errorThrown){
      if(jqXHR.status == "401"){
        defaultPersistence.store('after_login', extended_options);
        forwardTo('#/login');
      }
    },
    'complete' : function(jqXHR, textStatus){},
    'skip_loading' : false,
    'skip_remove_loading' : false
  }
  $.extend(options, extended_options)

  // Add CSRF Protection
  if($.inArray(options['method'].toUpperCase(), ['POST','PUT','DELETE']) != -1){
    var nonce = Math.random().toString();
    $.cookie('X-CSRF-Token', nonce);

    if(options['data'] == ''){
      options['data'] = 'csrf_token=' + nonce;
    } else {
      options['data'] = options['data'] + '&csrf_token=' + nonce;
    }
  }

  // Patching URL
  if(options['url'])          var path = options['url'];
  else if(options['apiUrl'])  var path = conf['apiUrl'] + options['apiUrl'];
  else if(options['viewUrl']) var path = conf['viewUrl'] + options['viewUrl'];

  // Create Loading
  if(!options['skip_loading']){
    LoadingHelper.create(path);
  } else if (LoadingHelper.doesLoadingExist(path)){
    // Is request in progress? if yes, return
    return false;
  }
  
  // Ajax Request
  $.ajax({
    method: options['method'].toUpperCase(),
    url: path,
    data: options['data'],
    headers: options['headers'],
    xhrFields: {
      withCredentials: true
    },
    statusCode: options['statusCode'],
    success: options['success'],
    error: function(jqXHR, textStatus, errorThrown){
      options['error'](jqXHR, textStatus, errorThrown);
      options['errorEpilogue'](jqXHR, textStatus, errorThrown);
    },
    complete: function(jqXHR, textStatus){
      if(!options['skip_remove_loading']){
        LoadingHelper.remove(path);
      }
      
      options['complete'](jqXHR, textStatus);
      epilogueCallback(options['apiUrl']);
    }
  });
}

HttpHelper.getParameterByName = function(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
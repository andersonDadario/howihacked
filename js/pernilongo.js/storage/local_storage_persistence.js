var localStoragePersistence = function(){}

localStoragePersistence.store = function(key, value, isJson){
    if(!isJson) var value = JSON.stringify(value, function (key, value) {
        if (typeof value === 'function') {
            return value.toString();
        }
        
        return value;
    });
    localStorage.setItem(key, value);
    return true;
}

localStoragePersistence.restore = function(key){
    var item = localStorage.getItem(key);
    if(!item) return null;
    return JSON.parse(item, function (key, value) {
        if (value 
            && typeof value === "string" 
            && value.substr(0,8) == "function")
        {
            var startBody = value.indexOf('{') + 1;
            var endBody = value.lastIndexOf('}');
            var startArgs = value.indexOf('(') + 1;
            var endArgs = value.indexOf(')');

            return new Function(value.substring(startArgs, endArgs)
                              , value.substring(startBody, endBody));
        }
        return value;
    });
}

localStoragePersistence.delete = function(key){
    localStorage.removeItem(key);
    return true;
}
var defaultPersistence = function(){}

defaultPersistence.store = function(key, value, isJson){
    return localStoragePersistence.store(key, value, isJson);
}

defaultPersistence.restore = function(key){
    return localStoragePersistence.restore(key);
}

defaultPersistence.delete = function(key){
    return localStoragePersistence.delete(key);
}
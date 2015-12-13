var epilogue = {
    'success_messages' : [],
    'error_messages' : []
}

var epilogueCallback = function(isApi){
    if(!isApi){
        // Messages
        if(epilogue['success_messages'].length > 0){
            $.each(epilogue['success_messages'], function(index, message){
                MessageHelper.SuccessMessage.create(message);
            })
            epilogue['success_messages'] = [];
        }

        if(epilogue['error_messages'].length > 0){
            $.each(epilogue['error_messages'], function(index, message){
                MessageHelper.ErrorMessage.create(message);
            })
            epilogue['error_messages'] = [];
        }
    }
}
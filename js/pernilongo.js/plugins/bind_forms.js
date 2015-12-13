$(document).on("submit", "#content", function(e){
    e.preventDefault();
    var form = $(e.target);

    render(form.attr("action"), {
      'method' : form.attr("method"),
      'formData' : form.serialize()
    });

    return false;
});
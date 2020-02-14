$(document).ready(function() {
    var memory = [];
    // ***************************
    var apiTodos = 'http://157.230.17.132:3002/todos';
    // ***************************
    request(apiTodos, 'GET');
    // ***************************
    $(document).on('click', '.btn-update button', function() {
        var id = $(this).attr('data-id');
        var text = $('.input[data-id="' + id + '"]').val();
        request(apiTodos, 'PUT', text, id);
    });

});
// ***************************
// **********function*********
// ***************************
function request(api, method, text, id) {
    $.ajax(
        {
            url: typeUrl(api, method, id),
            method: method,
            data : param(method, text),
            success: function (data) {
                console.log(data);
                print(data);
            },
            error: function () {
            }
        }
    );
}
// ***************************
function typeUrl(url, method, id) {
    if (method == 'PUT') {
        return url + '/' + id;
    }
    return url;
}
// ***************************
function param(method, text) {
    switch (method) {
        case 'PUT':
            return {text : text};
        case 'GET':
            return;
    }
}
// ***************************
function print(data) {
var builder = Handlebars.compile($('#print').html());
for (var i = 0; i < data.length; i++) {
        $('.main').append(
            builder({
                id : data[i].id,
                text : data[i].text
            })
        );
    }
}

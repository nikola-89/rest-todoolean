$(document).ready(function() {
    var empty = [{
        id : '#',
        text : ''
    }];
    // ***************************
    refresh();
    // ***************************
    $(document).on('click', '.btn-update button', function() {
        var id = $(this).attr('data-id');
        var text = $('.input[data-id="' + id + '"]').val();
        request('PUT', text, id);
    });
    $(document).on('click', '.btn-delete button', function() {
        var id = $(this).attr('data-id');
        var text = null;
        request('DELETE', text, id);
    });
    $(document).on('click', '.btn-add button', function() {
        print(empty, null);
        $('.input').last().focus();
    });
});
// ***************************
// **********function*********
// ***************************
function request(method, text, id) {
    $.ajax(
        {
            url: typeUrl(method, id),
            method: method,
            data : param(method, text),
            success: function (data) {
                console.log(data);
                print(data, method);
            },
            error: function () {
            }
        }
    );
}
// ***************************
function typeUrl(method, id) {
    var url = 'http://157.230.17.132:3002/todos';
    if (method == 'PUT' || method == 'DELETE') {
        return url + '/' + id;
    }
    return url;
}
// ***************************
function param(method, text) {
    switch (method) {
        case 'PUT':
            return {text : text};
        case 'GET' || 'DELETE':
            return;
    }
}
// ***************************
function refresh() {
    request('GET');
}
// ***************************
function print(data, method) {
    var builder = Handlebars.compile($('#print').html());
    for (var i = 0; i < data.length; i++) {
            $('.main').append(
                builder({
                    id : data[i].id,
                    text : data[i].text
                })
            );
        }
    if (method == 'DELETE') {
        refresh();
    }
}

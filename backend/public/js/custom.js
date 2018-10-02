// funciones de javascript genericas

function Mask() {
    $(document.body).append("<div class = 'mask'></div>");
    $('.mask').css({
        'width': $(document).width(),
        'height': $(document).height(),
        'position': 'absolute',
        'top': 0,
        'left': 0,
        'background-color': 'black',
        'opacity': 0.2,
        'z-index': 9999
    });
}

function Loading() {

    if ($('#myModal').is(':visible') && !$('#myModal').is('[closing]')) {
        var x = $('.modal-body').width();
        var y = $('.modal-body').height();
        $('.modal-body').children().hide();
        if ($('.fa-spin').length == 0)
            $('.modal-body').append("<i class = 'fa fa-cog fa-spin' style = 'font-size: 50pt; margin: " + (y / 2 - 50) + "px " + (x / 2 - 25) + "px'></i>");

    } else {
        Mask();
        $(document.body).append("<div class = 'loading'><i class = 'fa fa-cog fa-spin'></i></div>");
        $('.loading').css({
            'position': 'absolute',
            'top': 200,
            'left': $(document).width() / 2 - 50,
            'z-index': 9999,
            'font-size': '72pt',
            'color': 'white'
        });
    }

}


function Modal(url, title, width, fn) {

    $('#myModal').on('show.bs.modal', function (e) {
        $('#modal-body').css({'visibility': 'hidden'});
    });
    $('#myModal').on('shown.bs.modal', function (e) {
        $('#modal-body').css({'visibility': 'visible'});
        Ready();
    });
    $('#myModal').on('hidden.bs.modal', function (e) {
//        $('.summernote').destroy();
        $('#modal-body').empty();
        $(this).removeAttr('closing');
        Dismiss();
    });
    $('#myModalLabel').text(title);
    $('#modal-dialog').animate({'width': width}, 500);
    
    if ($('#myModal').is(':visible')) {
        Loading();
        $('#modal-body').load(url, function () {
            if (fn)
                fn();
        });
    } else {
        Mask(); //$('#myModal').modal('show');
        $('#modal-body').load(url, function () {
            if (fn)
                fn();
            
            $('#myModal').modal('show');
        });
    }
}
function Dismiss() {
    $('#ui_notifIt.error').click();
}
function Modal2(url, title, width, fn) {

    $('#modal2').on('show.bs.modal', function (e) {
        $('#modal-body2').css({'visibility': 'hidden'});
    });
    $('#modal2').on('shown.bs.modal', function (e) {
        $('#modal-body2').css({'visibility': 'visible'});
//        Ready();
    });
    $('#modal2').on('hidden.bs.modal', function (e) {
//        $('.summernote').destroy();
        $('#modal-body2').empty();
        $(this).removeAttr('closing');
        Dismiss();
    });
    $('#myModalLabel2').text(title);
    $('#modal-dialog2').animate({'width': width}, 500);
    if ($('#modal2').is(':visible')) {
//        Loading();
        $('#modal-body2').load(url, function () {
            if (fn)
                fn();
        });
    } else {
//        Mask();
        $('#modal-body2').load(url, function () {
            if (fn)
                fn();
            $('#modal2').modal('show');
        });
    }
}
function CloseModal() {

    if (($("#modal2").data('bs.modal') || {}).isShown) {
        $('#modal2').modal('hide').attr('closing', '1');
    } else {
        $('#myModal').modal('hide').attr('closing', '1');
    }

}

function DisplayErrors(error) {
    var html = "<div class = 'alert alert-info text-justify'>";
    if (error.responseJSON.errors) {
        html += "<ul class=''>";
        $.each(error.responseJSON.errors, function (key, item) {
            //key is the field
            html += "<li>" + item[0] + "</li>";
        });
        html += "</ul>";
    } else {
        html += "<p><b>" + error.responseJSON.message + "</b></p>";
    }
    html += "</div>";
    return html;
}

function SweetAlert(type, text, fn, title) {
    var mytitle = "";
    switch (type) {
        case "confirm":
            mytitle = "Confirme...";
            break;
        case "success":
            mytitle = "¡Correcto!";
            break;
        case "error":
            mytitle = "¡Revisa que los datos sean correctos!";
            break;
        case "info":
            mytitle = "¡Aviso!";
            break;
        case "warning":
            mytitle = "Advertencia...";
            break;
    }

    var element = document.createElement('div');
    element.innerHTML = text;

    swal({
        title: (title ? title : mytitle),
        content: {element: element},
        icon: (type == "confirm" ? "warning" : type),
        buttons: (fn ? true : false),
//        button: "Cancelar",
//        closeOnCancel: true
    }).then((result) => {
        if (result && fn) {
            fn();
        }
    });
//    console.log(s)
}

function OK(msg) {
    SweetAlert("success", msg);
}

function Error(msg) {
    if (msg)
        SweetAlert("error", msg);
}

function Warning(msg) {
    SweetAlert("warning", msg);
}

function Question(msg, fn) {
    SweetAlert("info", msg, fn);
}

function ReloadGrid(obj, page, fn) {
    obj.clearAll();
    Loading();
    obj.loadXML(page, function () {

        obj.filterByAll();
        Count(obj);
        if (fn)
            fn();
        Ready();
    });
}

function Count(obj) {
    var counter = obj.getRowsNum();
    $(obj.entBox).parents('table').find('.RowCount').text("Total: " + counter);
    return counter;
}

function Ready() {
    var icon = $('.fa-spin').attr('action');
    $('.fa-spin').parents('button').removeAttr('disabled');
    if (icon)
        $('.fa-spin').parent().html("<i class = '" + icon + "'></i> " + $('.fa-spin').parent().text()).removeClass('disabled');
    $('.miniloading').parent().children().show();
    $('.mask, .loading, .miniloading, .fa-spin').remove();
    $('.modal-body').children().show();
}

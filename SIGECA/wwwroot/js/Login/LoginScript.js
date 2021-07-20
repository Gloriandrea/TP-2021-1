$(function () {

    function SwalFireMessageError(title, icon, html) {
        Swal.fire({
            title: '<strong>' + title + '</strong>',
            icon: icon,
            html: html,
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: false,
            confirmButtonColor: '#d33',
            confirmButtonText:
                '<i class="fa fa-thumbs-down"></i> Volver',
            confirmButtonAriaLabel: 'Volver',
        });
    }

    $("#boton").on('click', function () {
        $.ajax({
            url: $("#URL_Login").val(),
            type: 'post',
            data: "nombreUsuario=" + $("#usuario").val() + "&&clave=" + $("#clave").val(),
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (data.result == "success") {
                    if (data.value === "") {
                        SwalFireMessageError("Error!",
                            "error",
                            'Lo sentimos, Ocurrió un error Inesperado al registrar archivos del producto');
                    } else {
                        window.location.href = $("#URL_Redirect").val() + "?usuarioID=" + data.value;
                    }
                } else {
                    console.log("ERROR AL OBTENER LOS DATOS");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("ERROR AL OBTENER LOS DATOS");
            }
        });
    });

    

});
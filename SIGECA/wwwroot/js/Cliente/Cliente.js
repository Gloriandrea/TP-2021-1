$(document).ready(function () {
    $('#fechaNacimientoClienteRegistrar').datepicker({
        "format": "yyyy-mm-dd"
    });
});



$(function () {
    function limpiarClienteRegistrar() {
        $("#usuarioClienteRegistrar").val('');
        $("#correoClienteRegistrar").val('');
        $("#passwordClienteRegistrar").val('');
        $("#nombreClienteRegistrar").val('');
        $("#apellidoClienteRegistrar").val('');
        $("#telefonoClienteRegistrar").val('');
        $("#direccionClienteRegistrar").val('');
        $("#tipoDocumentoClienteRegistrar").val('DNI');
        $("#numeroDocumentoClienteRegistrar").val('');
        $("#fechaNacimientoClienteRegistrar").val('');
    }

    $("#btnRegistrarCliente").on("click", function (e) {
        var frmRegistrarCliente = $('#frmRegistrarCliente');
        e.preventDefault();
        $.ajax({
            url: frmRegistrarCliente.prop('action'),
            type: 'post',
            data: frmRegistrarCliente.serializeArray(),
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (data.result == "success") {
                    //Limpiando los Campos de Texto
                    limpiarClienteRegistrar();
                    //Mostrando el Mensaje de Exito
                    Swal.fire({
                        title: '<strong>Listo!</strong>',
                        icon: 'success',
                        html:
                            'Usuario Registrado Satisfactoriamente',
                        showCloseButton: true,
                        showCancelButton: false,
                        focusConfirm: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText:
                            '<i class="fa fa-thumbs-up"></i> Continuar',
                        confirmButtonAriaLabel: 'Continuar',
                    });
                }
                else {
                    Swal.fire({
                        title: '<strong>Error!</strong>',
                        icon: 'error',
                        html:
                            'Lo sentimos, Ocurrió un error Inesperado',
                        showCloseButton: true,
                        showCancelButton: false,
                        focusConfirm: false,
                        confirmButtonColor: '#d33',
                        confirmButtonText:
                            '<i class="fa fa-thumbs-down"></i> Volver',
                        confirmButtonAriaLabel: 'Volver',
                    });
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {

                Swal.fire({
                    title: '<strong>Error!</strong>',
                    icon: 'error',
                    html:
                        'Error del Servidor - Status 500',
                    showCloseButton: true,
                    showCancelButton: false,
                    focusConfirm: false,
                    confirmButtonColor: '#d33',
                    confirmButtonText:
                        '<i class="fa fa-thumbs-down"></i> Volver',
                    confirmButtonAriaLabel: 'Volver',
                });
            }
        });
    });
});


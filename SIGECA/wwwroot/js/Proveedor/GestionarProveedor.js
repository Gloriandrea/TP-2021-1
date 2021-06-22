$(document).ready(function () {
    $('.datatable-proveedor').DataTable(
        {
            dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
            "processing": true,
            "serverSide": true,
            "searching": true,
            "sort": true,
            "lengthChange": false,
            "autoWidth": false,
            "ajax": {
                "url": $('#URL_ProveedoresListarTodos').val(),
                "type": "POST",
                "error": function () {
                    document.location.reload();
                }
            },
            "oLanguage": {
                "oPaginate": {
                    "sFirst": "Primero",
                    "sNext": "Siguiente",
                    "sPrevious": "Anterior",
                    "sLast": "Ultimo"
                },
                "sInfo": "_START_ a _END_ de _TOTAL_ registros",
                "sLengthMenu": "Mostrar _MENU_ registros",
                "sSearch": "Buscar:",
                "sProcessing": "",
                "sInfoFiltered": "",
                "sInfoFiltered": '',
                "sZeroRecords": "No se encontro registros",
                "sInfoEmpty": "No hay registros para mostrar"
            },
            "serverParams": function (setting) {
            },
            "columns": [
                { "data": "nombreEmpresa" },
                { "data": "ruc" },
                { "data": "correoEmpresa" },
                { "render": function (data, type, full, meta) { return full.nombreContacto + ' ' + full.apellidoContacto; } },
                { "render": function (data, type, full, meta) { return '<span style="color: white" class="badge ' + (full.estado == "activo" ? 'bg-success' : 'bg-danger') + ' ">' + full.estado.charAt(0).toUpperCase() + full.estado.slice(1) + '</span>' } },
                {
                    "render": function (data, type, full, meta) {
                        return '<button class="btn btnVisualizarProveedor" style="color: #4AB6B6" data-proveedor-id="' + full.id + '"><img class="fas fa-eye" /></button>' +
                            '<button class="btn btnModificarProveedor" style="color: #4AB6B6" data-proveedor-id="' + full.id + '"><img class="fas fa-edit" /></button>' +
                            '<button class="btn btnCambiarEstadoProveedor" style="color: red" data-proveedor-id="' + full.id + '"><img class="fas fa-ban" /></button>';;
                    }
                }
            ]
        });


});


function limpiarModalRegistrar() {
    $("#nombreEmpresaProveedorRegistrar").val('');
    $("#rucProveedorRegistrar").val('');
    $("#correoEmpresaProveedorRegistrar").val('');
    $("#celularContactoProveedorRegistrar").val('');
    $("#direccionEmpresaProveedorRegistrar").val('');
    $("#nombreContactoProveedorRegistrar").val('');
    $("#apellidoContactoProveedorRegistrar").val('');
}

$("#btnRegistrarProveedor").on("click", function () {
    limpiarModalRegistrar();
    $("#modalRegistrarProveedor").modal('show');
});

$("#btnRegistrarProveedorModal").on("click", function () {
    if (validarProveedorRegistrar() == false) {
        return false;
    }
    var frmRegistrarProveedor = $('#frmRegistrarProveedor');
    $.ajax({
        url: frmRegistrarProveedor.prop('action'),
        type: 'post',
        data: frmRegistrarProveedor.serializeArray(),
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            if (data.result == "success") {
                //Escondiendo el Modal
                $("#modalRegistrarProveedor").modal('hide');
                //Limpiando los Campos de Texto
                limpiarModalRegistrar();
                //Recargar Tabla
                $('.datatable-proveedor').dataTable().fnDraw();
                //Mostrando el Mensaje de Exito
                Swal.fire({
                    title: '<strong>Listo!</strong>',
                    icon: 'success',
                    html:
                        'Proveedor Registrado Satisfactoriamente',
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

$('#TableProveedor').on('click', '.btnModificarProveedor', function (e) {
    e.preventDefault();
    var proveedorID = $(this).attr('data-proveedor-id');
    $.ajax({
        url: $("#URL_ObtenerProveedorPorID").val(),
        type: 'post',
        data: "idproveedor=" + proveedorID,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            if (data.result == "success") {
                var proveedor = data.value;
                $("#idProveedorModificar").val(proveedor.id)
                $("#nombreEmpresaProveedorModificar").val(proveedor.nombreEmpresa);
                $("#rucProveedorModificar").val(proveedor.ruc);
                $("#correoEmpresaProveedorModificar").val(proveedor.correoEmpresa);
                $("#celularContactoProveedorModificar").val(proveedor.celularContacto);
                $("#direccionEmpresaProveedorModificar").val(proveedor.direccionEmpresa);
                $("#nombreContactoProveedorModificar").val(proveedor.nombreContacto);
                $("#apellidoContactoProveedorModificar").val(proveedor.apellidoContacto);
                $("#modalModificarProveedor").modal('show');
            }
            else {
                console.log("ERROR AL OBTENER LOS DATOS");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("ERROR AL OBTENER LOS DATOS");
        }
    });
});

$("#btnModificarProveedorModal").on("click", function () {
    if (validarProveedorModificar() == false) {
        return false;
    }
    var frmModificarProveedor = $('#frmModificarProveedor');
    $.ajax({
        url: frmModificarProveedor.prop('action'),
        type: 'post',
        data: frmModificarProveedor.serializeArray(),
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            if (data.result == "success") {
                //Escondiendo el Modal
                $("#modalModificarProveedor").modal('hide');
                //Limpiando los Campos de Texto
                limpiarModalRegistrar();
                //Recargar Tabla
                $('.datatable-proveedor').dataTable().fnDraw();
                //Mostrando el Mensaje de Exito
                Swal.fire({
                    title: '<strong>Listo!</strong>',
                    icon: 'success',
                    html:
                        'Proveedor Actualizado Satisfactoriamente',
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

$('#TableProveedor').on('click', '.btnVisualizarProveedor', function (e) {
    e.preventDefault();
    var proveedorID = $(this).attr('data-proveedor-id');
    $.ajax({
        url: $("#URL_ObtenerProveedorPorID").val(),
        type: 'post',
        data: "idproveedor=" + proveedorID,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            if (data.result == "success") {
                var proveedor = data.value;
                $("#idProveedorVisualizar").val(proveedor.id)
                $("#nombreEmpresaProveedorVisualizar").val(proveedor.nombre);
                $("#rucProveedorVisualizar").val(proveedor.ruc);
                $("#correoEmpresaProveedorVisualizar").val(proveedor.correoEmpresa);
                $("#celularContactoProveedorVisualizar").val(proveedor.celularContacto);
                $("#direccionEmpresaProveedorVisualizar").val(proveedor.direccionEmpresa);
                $("#nombreContactoProveedorVisualizar").val(proveedor.nombreContacto);
                $("#apellidoContactoProveedorVisualizar").val(proveedor.apellidoContacto);
                $("#modalConsultarProveedor").modal('show');
            }
            else {
                console.log("ERROR AL OBTENER LOS DATOS");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("ERROR AL OBTENER LOS DATOS");
        }
    });
});

$('#TableProveedor').on('click', '.btnCambiarEstadoProveedor', function (e) {
    var proveedorID = $(this).attr('data-proveedor-id');
    $.ajax({
        url: $("#URL_ObtenerProveedorPorID").val(),
        type: 'post',
        data: "idproveedor=" + proveedorID,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            if (data.result == "success") {
                var proveedor = data.value;
                var estado = proveedor.estado;
                var texto = estado === "activo" ? "Desactivar" : "Activar";
                Swal.fire({
                    title: 'Modificacion de Estado',
                    text: "Desea " + texto + " al proveedor " + proveedor.nombreEmpresa,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: estado === "activo" ? "Desactivar" : "Activar",
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        var textoFinal = estado === "activo" ? "Desactivado" : "Activado";
                        $.ajax({
                            url: $("#URL_ProveedorActualizarEstado").val(),
                            type: 'post',
                            data: "proveedorid=" + proveedorID + "&estadoActual=" + estado,
                            dataType: "json",
                            success: function (data, textStatus, jqXHR) {
                                if (data.result == "success") {
                                    //Recargar Tabla
                                    $('.datatable-proveedor').dataTable().fnDraw();
                                    //Mostrar Mensaje Final
                                    Swal.fire(
                                        'Modificado!',
                                        'Proveedor ' + textoFinal + ' Satisfactoriamente',
                                        'success'
                                    );
                                }
                                else {
                                    Swal.fire(
                                        'Error!',
                                        'Ocurrio un error inesperado',
                                        'error'
                                    );
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                console.log("ERROR AL OBTENER LOS DATOS");
                            }
                        });
                    }
                });
            }
            else {
                console.log("ERROR AL OBTENER LOS DATOS");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("ERROR AL OBTENER LOS DATOS");
        }
    });
});

function validarProveedorRegistrar() {
    var msj = '';
    if ($('#nombreEmpresaProveedorRegistrar').val() == "") {
        msj += '*Ingresar el nombre del Proveedor. <br>'
    }
    if ($('#rucProveedorRegistrar').val() == "" || $('#rucProveedorRegistrar').val().trim().length != 11) {
        msj += '*Ingresar un número RUC valido. <br>'
    }
    if ($('#correoEmpresaProveedorRegistrar').val() == "") {
        msj += '*Ingresar un correo electronico. <br>'
    }
    if ($('#celularContactoProveedorRegistrar').val() == "") {
        msj += '*Ingresar un número Celular correcto. <br>'
    }
    if ($('#direccionEmpresaProveedorRegistrar').val() == "") {
        msj += '*Ingresar una dirección correcta. <br>'
    }
    if ($('#nombreContactoProveedorRegistrar').val() == "") {
        msj += '*Ingresar nombre del Contacto. <br>'
    }
    if ($('#apellidoContactoProveedorRegistrar').val() == "") {
        msj += '*Ingresar apellido del Contacto.'
    }
    if (msj != '') {
        Swal.fire({
            title: 'Hubo un Problema',
            html: msj,
            icon: 'warning',
            showConfirmButton: false,
            showCloseButton: true
        });
        return false;
    }
}

function validarProveedorModificar() {
    var msj = '';
    if ($('#nombreEmpresaProveedorModificar').val() == "") {
        msj += '*Ingresar el nombre del Proveedor. <br>'
    }
    if ($('#rucProveedorModificar').val() == "" || $('#rucProveedorModificar').val().trim().length != 11) {
        msj += '*Ingresar un número RUC valido. <br>'
    }
    if ($('#correoEmpresaProveedorModificar').val() == "") {
        msj += '*Ingresar un correo electronico. <br>'
    }
    if ($('#celularContactoProveedorModificar').val() == "") {
        msj += '*Ingresar un número Celular correcto. <br>'
    }
    if ($('#direccionEmpresaProveedorModificar').val() == "") {
        msj += '*Ingresar una dirección correcta. <br>'
    }
    if ($('#nombreContactoProveedorModificar').val() == "") {
        msj += '*Ingresar nombre del Contacto. <br>'
    }
    if ($('#apellidoContactoProveedorModificar').val() == "") {
        msj += '*Ingresar apellido del Contacto.'
    }
    if (msj != '') {
        Swal.fire({
            title: 'Hubo un Problema',
            html: msj,
            icon: 'warning',
            showConfirmButton: false,
            showCloseButton: true
        });
        return false;
    }
}
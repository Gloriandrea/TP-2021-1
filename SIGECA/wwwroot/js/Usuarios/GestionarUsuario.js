$(document).ready(function () {

    $('.datatable-usuario').DataTable(
        {
            dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
            "processing": true,
            "serverSide": true,
            "searching": true,
            "sort": true,
            "lengthChange": false,
            "autoWidth": false,
            "ajax": {
                "url": $('#URL_UsuariosListarTodos').val(),
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
                /*"searchBuilder": {
                    "add": "Añadir condición",
                    "button": {
                        "0": "Constructor de búsqueda",
                        "_": "Constructor de búsqueda (%d)"
                    },
                    "clearAll": "Borrar todo",
                    "condition": "Condición",
                    "conditions": {
                        "date": {
                            "after": "Despues",
                            "before": "Antes",
                            "between": "Entre",
                            "empty": "Vacío",
                            "equals": "Igual a",
                            "notBetween": "No entre",
                            "notEmpty": "No Vacio",
                            "not": "Diferente de"
                        },
                        "number": {
                            "between": "Entre",
                            "empty": "Vacio",
                            "equals": "Igual a",
                            "gt": "Mayor a",
                            "gte": "Mayor o igual a",
                            "lt": "Menor que",
                            "lte": "Menor o igual que",
                            "notBetween": "No entre",
                            "notEmpty": "No vacío",
                            "not": "Diferente de"
                        },
                        "string": {
                            "contains": "Contiene",
                            "empty": "Vacío",
                            "endsWith": "Termina en",
                            "equals": "Igual a",
                            "notEmpty": "No Vacio",
                            "startsWith": "Empieza con",
                            "not": "Diferente de"
                        },
                        "array": {
                            "not": "Diferente de",
                            "equals": "Igual",
                            "empty": "Vacío",
                            "contains": "Contiene",
                            "notEmpty": "No Vacío",
                            "without": "Sin"
                        }
                    }
                },"searchPanes": {
                    "clearMessage": "Borrar todo",
                    "collapse": {
                        "0": "Paneles de búsqueda",
                        "_": "Paneles de búsqueda (%d)"
                    },
                    "count": "{total}",
                    "countFiltered": "{shown} ({total})",
                    "emptyPanes": "Sin paneles de búsqueda",
                    "loadMessage": "Cargando paneles de búsqueda",
                    "title": "Filtros Activos - %d"
                },*/
                "sProcessing": "",
                "sInfoFiltered": "",
                "sInfoFiltered": '',
                "sZeroRecords": "No se encontro registros",
                "sInfoEmpty": "No hay registros para mostrar"
            },
            "serverParams": function (setting) {
                //setting.UsuarioID = $('#UsuarioID').val();
            },
            "columns": [
                { "data": "nombreUsuario" },
                { "render": function (data, type, full, meta) { return full.datos.nombre + ' ' + full.datos.apellido; } },
                { "data": "tipoUsuario" },
                { "data": "datos.numeroDocumento" },
                { "data": "estado" },
                { "render": function (data, type, full, meta) {
                    return '<button class="btn btnVisualizarUsuario" data-usuario-id="' + full.id + '"><img class="fas fa-eye" /></button>' +
                        '<button class="btn btnModificarUsuario" data-usuario-id="' + full.id + '"><img class="fas fa-edit" /></button>' +
                        '<button class="btn btnCambiarEstadoUsuario" data-usuario-id="' + full.id + '"><img class="fas fa-ban" /></button>';;
                    }
                }/*,{"render": function (data, type, full, meta) {
                        return '<button class="btn btnModificarUsuario" data-usuario-id="' + full.id + '"><img class="fas fa-eye" /></button>';
                    }
                },{"render": function (data, type, full, meta) {
                        return '<button class="btn btnCambiarEstadoUsuario" data-usuario-id="' + full.id + '"><img class="fas fa-eye" /></button>';
                    }
                }*/
            ]
        });



    $('#fechaNacimientoUsuarioRegistrar').datepicker({
        "format": "yyyy-mm-dd"
    });

    $('#fechaNacimientoUsuarioModificar').datepicker({
        "format": "yyyy-mm-dd"
    });

});

$(function () {
   

  

    //REGISTRO DE USUARIOS
    function limpiarModalRegistrar() {
        $("#nombreUsuarioRegistrar").val('');
        $("#apellidoUsuarioRegistrar").val('');
        $("#emailUsuarioRegistrar").val('');
        $("#telefonoUsuarioRegistrar").val('');
        $("#direccionUsuarioRegistrar").val('');
        $("#tipoDocumentoUsuarioRegistrar").val('DNI');
        $("#telefonoUsuarioRegistrar").val('');
        $("#tipoUsuarioUsuarioRegistrar").val('Administrador');
        $("#fechaNacimientoUsuarioRegistrar").val('');
        $("#rolRegistrarUsuario").eq(0).prop('selected', true);
    }

    $("#btnRegistrarUsuario").on("click", function () {
        limpiarModalRegistrar();
        $("#modalRegistrarUsuario").modal('show');
    });

    $("#btnRegistrarUsuarioModal").on("click", function () {
        var frmRegistrarUsuario = $('#frmRegistrarUsuario');
        
        $.ajax({
            url: frmRegistrarUsuario.prop('action'),
            type: 'post',
            data: frmRegistrarUsuario.serializeArray(),
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (data.result == "success") {
                    //Escondiendo el Modal
                    $("#modalRegistrarUsuario").modal('hide');
                    //Limpiando los Campos de Texto
                    limpiarModalRegistrar();
                    //Recargar Tabla
                    $('.datatable-usuario').dataTable().fnDraw();
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
                else{
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

    //MODIFICACION DE USUARIOS
    $('#TableUsuario').on('click', '.btnModificarUsuario', function (e) {
        e.preventDefault();
        var usuarioID = $(this).attr('data-usuario-id');
        $.ajax({
            url: $("#URL_ObtenerUsuarioPorID").val(),
            type: 'post',
            data: "idusuario="+usuarioID,
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (data.result == "success") {
                    var usuario = data.value;
                    $("#idUsuarioModificar").val(usuario.id)
                    $("#nombreUsuarioModificar").val(usuario.datos.nombre);
                    $("#apellidoUsuarioModificar").val(usuario.datos.apellido);
                    $("#emailUsuarioModificar").val(usuario.datos.email);
                    $("#telefonoUsuarioModificar").val(usuario.datos.telefono);
                    $("#direccionUsuarioModificar").val(usuario.datos.direccion);
                    $("#tipoDocumentoUsuarioModificar").val(usuario.datos.tipoDocumento);
                    $("#numeroDocumentoUsuarioModificar").val(usuario.datos.numeroDocumento);
                    $("#tipoUsuarioUsuarioModificar").val(usuario.tipoUsuario);
                    $("#fechaNacimientoUsuarioModificar").datepicker('update', usuario.datos.fechaNacimiento.split("T")[0]);
                    $("#rolModificarUsuario").val(usuario.rol);
                    $("#modalModificarUsuario").modal('show');
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

    $("#btnModificarUsuarioModal").on("click", function () {
        var frmModificarUsuario = $('#frmModificarUsuario');
        $.ajax({
            url: frmModificarUsuario.prop('action'),
            type: 'post',
            data: frmModificarUsuario.serializeArray(),
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (data.result == "success") {
                    //Escondiendo el Modal
                    $("#modalModificarUsuario").modal('hide');
                    //Limpiando los Campos de Texto
                    limpiarModalRegistrar();
                    //Recargar Tabla
                    $('.datatable-usuario').dataTable().fnDraw();
                    //Mostrando el Mensaje de Exito
                    Swal.fire({
                        title: '<strong>Listo!</strong>',
                        icon: 'success',
                        html:
                            'Usuario Actualizado Satisfactoriamente',
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

    $(function () {
        function limpiarFormulario() {
            $("#usuarioContraseña").val('');
            $("#usuarioContraseñaRepetir").val('');
        }

        $("#btnCambiarContraseña").on("click", function (e) {
            var frmCambiarContraseña = $('#frmCambiarContraseña');
            e.preventDefault();
            $.ajax({
                url: frmCambiarContraseña.prop('action'),
                type: 'post',
                data: frmCambiarContraseña.serializeArray(),
                dataType: "json",
                success: function (data, textStatus, jqXHR) {
                    if (data.result == "success") {
                        //Limpiando los Campos de Texto
                        limpiarFormulario();
                        //Mostrando el Mensaje de Exito
                        Swal.fire({
                            title: '<strong>Listo!</strong>',
                            icon: 'success',
                            html:
                                'Contraseña Cambiada Correctamente',
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

    
    //VISUALIZACION DE USUARIOS
    $('#TableUsuario').on('click', '.btnVisualizarUsuario', function (e) {
        e.preventDefault();
        var usuarioID = $(this).attr('data-usuario-id');
        $.ajax({
            url: $("#URL_ObtenerUsuarioPorID").val(),
            type: 'post',
            data: "idusuario=" + usuarioID,
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (data.result == "success") {
                    var usuario = data.value;
                    $("#idUsuarioVisualizar").val(usuario.id)
                    $("#nombreUsuarioVisualizar").val(usuario.datos.nombre);
                    $("#apellidoUsuarioVisualizar").val(usuario.datos.apellido);
                    $("#emailUsuarioVisualizar").val(usuario.datos.email);
                    $("#telefonoUsuarioVisualizar").val(usuario.datos.telefono);
                    $("#direccionUsuarioVisualizar").val(usuario.datos.direccion);
                    $("#tipoDocumentoUsuarioVisualizar").val(usuario.datos.tipoDocumento);
                    $("#numeroDocumentoUsuarioVisualizar").val(usuario.datos.numeroDocumento);
                    $("#tipoUsuarioUsuarioVisualizar").val(usuario.tipoUsuario);
                    $("#fechaNacimientoUsuarioVisualizar").datepicker('update', usuario.datos.fechaNacimiento.split("T")[0]);
                    $("#rolVisualizarUsuario").val(usuario.rol);
                    $("#modalConsultarUsuario").modal('show');
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

    //CAMBIO DE ESTADO DE USUARIOS
    $('#TableUsuario').on('click', '.btnCambiarEstadoUsuario', function (e) {
        var usuarioID = $(this).attr('data-usuario-id');
        $.ajax({
            url: $("#URL_ObtenerUsuarioPorID").val(),
            type: 'post',
            data: "idusuario=" + usuarioID,
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (data.result == "success") {
                    var usuario = data.value;
                    var estado = usuario.estado;
                    var texto = estado === "activo" ? "Desactivar" : "Activar";
                        Swal.fire({
                            title: 'Modificacion de Estado',
                            text: "Desea " + texto + " al usuario " + usuario.nombreUsuario,
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
                                    url: $("#URL_UsuarioActualizarEstado").val(),
                                    type: 'post',
                                    data: "usuarioid=" + usuarioID +"&estadoActual="+estado,
                                    dataType: "json",
                                    success: function (data, textStatus, jqXHR) {
                                        if (data.result == "success") {
                                            //Recargar Tabla
                                            $('.datatable-usuario').dataTable().fnDraw();
                                            //Mostrar Mensaje Final
                                            Swal.fire(
                                                'Modificado!',
                                                'Usuario ' + textoFinal +' Satisfactoriamente',
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


    //////////////////////////////////////////////////////////////////
    //VISUALIZACION DE USUARIOS
    $('.btnTest').on('click',  function (e) {
       $.ajax({
            url: $("#URL_UsuarioRolPermisoPorID").val(),
            type: 'post',
            data: "usuarioid=" + "60866503badfa72d04a57330",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                console.log(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("ERROR AL OBTENER LOS DATOS");
            }
        });
    });

});
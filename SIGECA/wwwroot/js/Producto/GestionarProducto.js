Dropzone.autoDiscover = true;
$("#myDropzone1").dropzone({
    url: "/Producto",
    dictDefaultMessage: 'Arrastrar una imagen para subir <span>o CLIC AQUÍ</span>',
    autoProcessQueue: false,
    maxFiles: 1,
    addRemoveLinks: true,
    acceptedFiles: "image/*",

});
$(function () {
    /*Dropzone.options.urlImagenProducto = {
        url: "/Account/Create",
        dictDefaultMessage: 'Arrastrar una imagen para subir <span>o CLIC AQUÍ</span>',
        autoProcessQueue: false,
        maxFiles: 1 ,
        addRemoveLinks: true,
        acceptedFiles: "image/*",
        init: function () {
            myDropzone = this;
            this.on("addedfile", function (file) {
                console.log("hola");
                console.log(file);
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (event) {
                };
            });
        }
    };*/

    $('.datatable-producto').DataTable(
        {
            dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
            "processing": true,
            "serverSide": true,
            "searching": true,
            "sort": true,
            "lengthChange": false,
            "autoWidth": false,
            "ajax": {
                "url": $('#URL_ProductosListarTodos').val(),
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
                "sZeroRecords": "No se encontro registros",
                "sInfoEmpty": "No hay registros para mostrar"
            },
            "serverParams": function (setting) {
                //setting.UsuarioID = $('#UsuarioID').val();
            },
            "columns": [
                { "data": "nombre" },
                { "data": "categoria.nombre"},
                { "data": "tipoVenta" },
                { "data": "precio" },
                { "data": "stock" },
                {
                    "render": function (data, type, full, meta) {
                        return '<button class="btn btnVisualizarProducto" data-producto-id="' + full.id + '"><img class="fas fa-eye" /></button>' +
                            '<button class="btn btnModificarProducto" data-producto-id="' + full.id + '"><img class="fas fa-edit" /></button>';
                            //'<button class="btn btnCambiarEstadoUsuario" data-usuario-id="' + full.id + '"><img class="fas fa-ban" /></button>';;
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

    //REGISTRO DE PRODUCTOS
  

    function limpiarModalRegistrar() {
        $("#nombreRegistrarProducto").val('');
        $("#precioRegistrarProducto").val('');
        $("#categoriaProductoRegistrarProducto").eq(0).prop('selected', true);
        $("#precioOfertaRegistrarProducto").val('');
        $("#imagenRegistrarProducto option").val('');
    }

    $("#btnRegistrarProducto").on("click", function () {
        limpiarModalRegistrar();
        $("#modalRegistrarProducto").modal('show');
    });

    $("#btnRegistrarProductoModal").on("click", function () {
        var frmRegistrarProducto = $('#frmRegistrarProducto');

        $.ajax({
            url: frmRegistrarProducto.prop('action'),
            type: 'post',
            data: frmRegistrarProducto.serializeArray(),
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (data.result == "success") {
                    //Escondiendo el Modal
                    $("#modalRegistrarProducto").modal('hide');
                    //Limpiando los Campos de Texto
                    limpiarModalRegistrar();
                    //Recargar Tabla
                    $('.datatable-producto').dataTable().fnDraw();
                    //Mostrando el Mensaje de Exito
                    Swal.fire({
                        title: '<strong>Listo!</strong>',
                        icon: 'success',
                        html:
                            'Producto Registrado Satisfactoriamente',
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

    //MODIFICACION DE PRODUCTOS
    $('.datatable-producto').on('click', '.btnModificarProducto', function (e) {
        e.preventDefault();
        var productoID = $(this).attr('data-producto-id');
        $.ajax({
            url: $("#URL_ProductoPorID").val(),
            type: 'post',
            data: "productoID=" + productoID,
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (data.result == "success") {
                    var producto = data.value;
                    $("#idProductoModificar").val(producto.id);
                    $("#nombreModificarProducto").val(producto.nombre);
                    $("#precioModificarProducto").val(producto.precio);
                    $("#descripcionModificarProducto").val(producto.descripcion);
                    $("#categoriaProductoModificarProducto").val(producto.categoriaID);
                    $("#tipoVentaModificarProducto").val(producto.tipoVenta);
                    $("#modalModificarProducto").modal('show');
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

    $("#btnModificarProductoModal").on("click", function () {
        var frmModificarProducto = $('#frmModificarProducto');
        $.ajax({
            url: frmModificarProducto.prop('action'),
            type: 'post',
            data: frmModificarProducto.serializeArray(),
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (data.result == "success") {
                    //Escondiendo el Modal
                    $("#modalModificarProducto").modal('hide');
                    //Recargar Tabla
                    $('.datatable-producto').dataTable().fnDraw();
                    //Mostrando el Mensaje de Exito
                    Swal.fire({
                        title: '<strong>Listo!</strong>',
                        icon: 'success',
                        html:
                            'Producto Actualizado Satisfactoriamente',
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

    //VISUALIZACION DE PRODUCTOS
    $('#TableUsuario').on('click', '.btnVisualizarUsuario', function (e) {
        e.preventDefault();
        var usuarioID = $(this).attr('data-producto-id');
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
    /*$('#TableUsuario').on('click', '.btnCambiarEstadoUsuario', function (e) {
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
                                data: "usuarioid=" + usuarioID + "&estadoActual=" + estado,
                                dataType: "json",
                                success: function (data, textStatus, jqXHR) {
                                    if (data.result == "success") {
                                        //Recargar Tabla
                                        $('.datatable-usuario').dataTable().fnDraw();
                                        //Mostrar Mensaje Final
                                        Swal.fire(
                                            'Modificado!',
                                            'Usuario ' + textoFinal + ' Satisfactoriamente',
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
    });*/

});
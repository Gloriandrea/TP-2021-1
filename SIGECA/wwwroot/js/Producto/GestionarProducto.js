/// <reference path="inventario.js" />
Dropzone.autoDiscover = false;
$(function () {
    var myDropzone;
    var myDropzoneMod;
    var codigoQR =  new QRCode(document.getElementById('qrResult'), {
        text: "defaultProduct",
        width: 150,
        height: 150,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
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
                { "data": "categoria.nombre" },
                { "data": "tipoVenta" },
                { "data": "precio" },
                { "data": "stock" },
                {
                    "render": function (data, type, full, meta) {
                        return '<button class="btn btnVisualizarProducto" data-producto-id="' + full.id + '"><img class="fas fa-eye" /></button>' +
                            '<button class="btn btnModificarProducto" data-producto-id="' + full.id + '"><img class="fas fa-edit" /></button>';
                            
                    }
                }
            ]
        });

    $('#fechaNacimientoUsuarioRegistrar').datepicker({
        "format": "yyyy-mm-dd"
    });

    $('#fechaNacimientoUsuarioModificar').datepicker({
        "format": "yyyy-mm-dd"
    });


    function dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], { type: mimeString });
    }

    function GenerateQRCodeProducto(ProductoID) {
        new QRCode(document.getElementById('qrResult'), {
            text:  ProductoID,
            width: 150,
            height: 150,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        return;
    }

    //REGISTRO DE PRODUCTOS

    $("#myDropzone1").dropzone({
        url: "/Producto",
        dictDefaultMessage: 'Arrastrar una imagen para subir <span>o CLIC AQUÍ</span>',
        autoProcessQueue: true,
        maxFiles: 1,
        addRemoveLinks: true,
        acceptedFiles: "image/*",
        init: function () {
            myDropzone = this;
            this.on("addedfile", function (file) {
                console.log(file);
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (event) {
                };
            });
        }
    });

    function limpiarModalRegistrar() {
        $("#nombreRegistrarProducto").val('');
        $("#categoriaProductoRegistrarProducto").eq(0).prop('selected', true);
        $("#descripcionRegistrarProducto").val('');
        $("#precioRegistrarProducto").val('');
        $("#tipoVentaRegistrarProducto").eq(0).prop('selected', true);
        $("#unidadMedidaRegistrarProducto").eq(0).prop('selected', true);
        $("#stockRegistrarProducto").val('');
        myDropzone.removeAllFiles(true);
    }

    $("#btnRegistrarProducto").on("click", function () {
        limpiarModalRegistrar();
        $("#modalRegistrarProducto").modal('show');
    });

    $("#btnRegistrarProductoModal").on("click", function () {
        //Apuntando al formulario
        var frmRegistrarProducto = $('#frmRegistrarProducto');
        $.ajax({
            url: frmRegistrarProducto.prop('action'),
            type: 'post',
            data: frmRegistrarProducto.serializeArray(),
            dataType: "json",
            success: async function (data, textStatus, jqXHR) {
                if (data.result == "success") {
                    var newProductoID = data.productoID;
                    //creando el form data y codigoQR
                    var formData = new FormData();
                    //agregando imagen y codigo qr al form data
                    formData.append("file", myDropzone.files[0]);
                    $.ajax({
                        url: $("#URL_SubirImagenYQRCode").val() + "?productoID=" + newProductoID,
                        type: "post",
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (data1) {
                            if (data1.result == "success") {
                                //Escondiendo el Modal
                                $("#modalRegistrarProducto").modal('hide');
                                //Limpiando los Campos de Texto
                                limpiarModalRegistrar();
                                //Recargar Tabla
                                $('.datatable-producto').dataTable().fnDraw();
                                //Mostrando el Mensaje de Exito
                                SwalFireMessageSuccess("Listo!", "success", "Producto Registrado Satisfactoriamente");

                            } else {
                                SwalFireMessageError("Error!", "error", 'Lo sentimos, Ocurrió un error Inesperado al registrar archivos del producto');
                            }
                        }
                    });
                } else {
                    SwalFireMessageError("Error!", "error", 'Lo sentimos, Ocurrió un error Inesperado al registrar datos del producto');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                SwalFireMessageError("Error!", "error", 'Error del Servidor - Status 500 => Registro de de datos');
            }
        });
    });
   
    function SwalFireMessageSuccess(title, icon,html) {
        Swal.fire({
            title: '<strong>'+title+'</strong>',
            icon: icon,
            html: html,
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText:
                '<i class="fa fa-thumbs-up"></i> Continuar',
            confirmButtonAriaLabel: 'Continuar',
        });
    }

    function SwalFireMessageError(title, icon, html) {
        Swal.fire({
            title: '<strong>'+title+'</strong>',
            icon: icon,
            html:html,
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: false,
            confirmButtonColor: '#d33',
            confirmButtonText:
                '<i class="fa fa-thumbs-down"></i> Volver',
            confirmButtonAriaLabel: 'Volver',
        });
    }

    //MODIFICACION DE PRODUCTOS

    $("#myDropzone2").dropzone({
        url: "/ProductoMod",
        dictDefaultMessage: 'Arrastrar una imagen para subir <span>o CLIC AQUÍ</span>',
        autoProcessQueue: true,
        maxFiles: 1,
        addRemoveLinks: true,
        acceptedFiles: "image/*",
        init: function () {
            myDropzoneMod = this;
            this.on("addedfile", function (file) {
                console.log(file);
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (event) {
                };
            });
        }
    });

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
                    var producto = data.value.producto;
                    $("#idProductoModificar").val(producto.id);

                    $("#nombreModificarProducto").val(producto.nombre);
                    $("#categoriaModificarProducto").val(producto.categoriaID);
                    $("#descripcionModificarProducto").val(producto.descripcion);
                    $("#precioModificarProducto").val(producto.precio);
                    $("#tipoVentaModificarProducto").val(producto.tipoVenta);
                    $("#stockModificarProducto").val(producto.stock);
                    $("#imagenProducto").attr("src", producto.urlImagen);
                    $("#urlImagenModificarProducto").val(producto.urlImagen);
                    $("#codigoQR").attr('src', producto.codigoQR);
                    $("#unidadMedidaModificarProducto").val(producto.unidadMedida);
                    $("#modalModificarProducto").modal('show');
                } else {
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
                    if (myDropzoneMod.files.length !== 0) {
                        var formData = new FormData();
                        formData.append("file", myDropzoneMod.files[0]);
                        var urlAntiguo = $("#urlImagenModificarProducto").val();
                        var productoID = $("#idProductoModificar").val();
                        $.ajax({
                            url: $("#URL_ActualizarImagen").val() + "?rutaAntigua=" + urlAntiguo.split("productos/")[1].split(".")[0] + "&&productoId=" + productoID,
                            type: "post",
                            data: formData,
                            processData: false,
                            contentType: false,
                            success: function (data1) {
                                if (data1.result == "success") {
                                    //Escondiendo el Modal
                                    $("#modalModificarProducto").modal('hide');
                                    myDropzoneMod.removeAllFiles(true);
                                    //Recargar Tabla
                                    $('.datatable-producto').dataTable().fnDraw();
                                    //Mostrando el Mensaje de Exito
                                    SwalFireMessageSuccess("Listo!", "success", "Producto Actualizado Satisfactoriamente");

                                } else {
                                    SwalFireMessageError("Error!", "error", 'Lo sentimos, Ocurrió un error Inesperado al registrar archivos del producto');
                                }
                            }
                        });

                    } else {
                        //Escondiendo el Modal
                        $("#modalModificarProducto").modal('hide');
                        myDropzone.removeAllFiles(true);
                        //Recargar Tabla
                        $('.datatable-producto').dataTable().fnDraw();
                        //Mostrando el Mensaje de Exito
                        SwalFireMessageSuccess("Listo!", "success", "Producto Actualizado Satisfactoriamente");

                    }

                } else {
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
    $('.datatable-producto').on('click', '.btnVisualizarProducto', function (e) {
        e.preventDefault();
        var productoID = $(this).attr('data-producto-id');
        $.ajax({
            url: $("#URL_ProductoPorID").val(),
            type: 'post',
            data: "productoID=" + productoID,
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (data.result == "success") {
                    var producto = data.value.producto;
                    $("#idProductoVisualizar").val(producto.id);
                    $("#nombreVisualizarProducto").val(producto.nombre);
                    $("#categoriaVisualizarProducto").val(producto.categoriaID);
                    $("#descripcionVisualizarProducto").val(producto.descripcion);
                    $("#precioVisualizarProducto").val(producto.precio);
                    $("#tipoVentaVisualizarProducto").val(producto.tipoVenta);
                    $("#stockVisualizarProducto").val(producto.stock);
                    $("#unidadMedidaVisualizarProducto").val(producto.unidadMedida)
                    $("#imagenProductoVisualizarProducto").attr("src", producto.urlImagen);
                    $("#urlImagenVisualizarProducto").val(producto.urlImagen);
                    $("#codigoQRVisualizarProducto").attr('src', producto.codigoQR);
                    $("#modalVisualizarProducto").modal('show');
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

$('.datatable-inventario').DataTable(
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
                        return '<button class="btn btnInventarioInicial" style="color:#4AB6B6" data-producto-id="' + full.id + '"><img class="fas fa-edit" />Inicial</button>' +
                        '<button class="btn btnInventarioFinal" style="color:red" data-producto-id="' + full.id + '"><img class="fas fa-edit" />Final</button>';

                    }
                }
            ]
        });

    //$('#fechaNacimientoUsuarioRegistrar').datepicker({
    //    "format": "yyyy-mm-dd"
    //});

    //$('#fechaNacimientoUsuarioModificar').datepicker({
    //    "format": "yyyy-mm-dd"
    //});


    function SwalFireMessageSuccess(title, icon, html) {
        Swal.fire({
            title: '<strong>' + title + '</strong>',
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

  
$('.datatable-inventario').on('click', '.btnInventarioInicial', function (e) {
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
                    $("#stock").val(producto.stock);
                  

                    if ($("#stock").val() == 0)
                    {                       
                            $("#nuevoStock").keyup(function () {
                                var value = $(this).val();
                                $("#stockInicial").val(value);
                                $("#stock").val(value);
                            });
                        
                    }
                    else {
                            $("#nuevoStock").keyup(function () {
                                var value = $(this).val();
                                $("#stock").val(producto.stock);
                                $("#stockInicial").val(parseInt(value) + parseInt($("#stock").val()));
                            });
                    }
                    const fecha = new Date();
                    const hh = fecha.getHours().toString();
                    const min = fecha.getMinutes().toString();

                    $("#fechaInicial").val(formatoFecha(fecha, "dd/mm/yyyy") + " - " + hh + ":" + min);
                    $("#imagenProducto").attr("src", producto.urlImagen);
                    $("#urlImagenModificarProducto").val(producto.urlImagen);
                    $("#codigoQR").attr('src', producto.codigoQR);
                    $("#unidadMedidaModificarProducto").val(producto.unidadMedida);
                    $("#modalInventarioInicial").modal('show');
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
                                      
                    //Escondiendo el Modal
                    $("#modalModificarProducto").modal('hide');
                                    
                    //Recargar Tabla
                    $('.datatable-inventario').dataTable().fnDraw();
                    //Mostrando el Mensaje de Exito
                    SwalFireMessageSuccess("Listo!", "success", "Producto Actualizado Satisfactoriamente");

                } else {
                                    
                    SwalFireMessageError("Error!", "error", 'Lo sentimos, Ocurrió un error Inesperado al registrar archivos del producto');
                }
            }
        });

    });

function formatoFecha(fecha, formato) {
    const map = {
        dd: fecha.getDate(),
        mm: fecha.getMonth() + 1,
        yy: fecha.getFullYear().toString().slice(-2),
        yyyy: fecha.getFullYear()
    }

    return formato.replace(/dd|mm|yyyy|yyy/gi, matched => map[matched])
}

 //Modal inventario final
$('.datatable-inventario').on('click', '.btnInventarioFinal', function (e) {
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
                $("#idProd").val(producto.id);
                $("#nombreP").val(producto.nombre);
                $("#categoriaP").val(producto.categoriaID);
                $("#descripcionP").val(producto.descripcion);
                $("#precioP").val(producto.precio);
                $("#tipoVentaP").val(producto.tipoVenta);
                $("#stockS").val(producto.stock);               
                $("#stockIni").val("1000");
                $("#stockFinal").val(producto.stock);
                $("#ventaDia").val(parseInt($("#stockIni").val()) - parseInt($("#stockFinal").val()));
                $("#imagenProducto").attr("src", producto.urlImagen);
                $("#urlImagenProd").val(producto.urlImagen);
                $("#codigoQR").attr('src', producto.codigoQR);
                $("#unidadMedidaP").val(producto.unidadMedida);
                $("#modalInventarioFinal").modal('show');
                const fecha = new Date();
                const hh = fecha.getHours().toString();
                const min = fecha.getMinutes().toString();
          
                $("#dateFinal").val(formatoFecha(fecha, "dd/mm/yyyy") +" - "+ hh +":"+ min );
            } else {
                console.log("ERROR AL OBTENER LOS DATOS");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("ERROR AL OBTENER LOS DATOS");
        }
    });
});

$("#btnModificarProductoModal2").on("click", function () {
    var frmInventarioFinal = $('#frmInventarioFinal');
    $.ajax({
        url: frmInventarioFinal.prop('action'),
        type: 'post',
        data: frmInventarioFinal.serializeArray(),
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            if (data.result == "success") {

                //Escondiendo el Modal
                $("#modalModificarProducto").modal('hide');

                //Recargar Tabla
                $('.datatable-inventario').dataTable().fnDraw();
                //Mostrando el Mensaje de Exito
                SwalFireMessageSuccess("Listo!", "success", "Producto Actualizado Satisfactoriamente");

            } else {

                SwalFireMessageError("Error!", "error", 'Lo sentimos, Ocurrió un error Inesperado al registrar archivos del producto');
            }
        }
    });

});


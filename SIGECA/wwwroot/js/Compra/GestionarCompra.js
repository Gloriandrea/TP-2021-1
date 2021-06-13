var itemsProductos = [];
var costoTotal = 0.00;
var costoProductoRegistrar = 0.00;
$(document).ready(function () {
    
    $('.datatable-compra').DataTable(
        {
            dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
            "processing": true,
            "serverSide": true,
            "searching": true,
            "sort": true,
            "lengthChange": false,
            "autoWidth": false,
            "ajax": {
                "url": $('#URL_ComprasListarTodos').val(),
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
                { "render": function (data, type, full, meta) { return full.nombreEmpresa } },
                { "render": function (data, type, full, meta) { return full.proveedorRUC } },
                { "render": function (data, type, full, meta) { return 'S/. ' + parseFloat(full.costoTotal).toFixed(2) } },
                {
                    "render": function (data, type, full, meta) {
                        var date = new Date(Date.parse(full.fecha));
                        return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
                    }
                },
                {
                    "render": function (data, type, full, meta) {
                        return '<button class="btn btnVisualizarCompra" style="color: #4AB6B6" data-compra-id="' + full.id + '"><img class="fas fa-eye" /></button>' +
                            '<button class="btn btnModificarCompra" style="color: #4AB6B6" data-compra-id="' + full.id + '"><img class="fas fa-edit" /></button>' +
                            '<button class="btn btnCambiarEstadoCompra" style="color: red" data-compra-id="' + full.id + '"><img class="fas fa-ban" /></button>';;
                    }
                }
            ]
        });

    
});

$("#itemCompra").on("click", ".btnBorrar", function (event) {
    $(this).closest("tr").remove();
    var costoBorrar = parseFloat($(this).closest("tr")[0].cells[3].textContent);
    costoTotal -= costoBorrar;
    $('#itemRegistrarTotal').text(parseFloat(costoTotal).toFixed(2));
});

$("#itemCompraModificar").on("click", ".btnBorrar", function (event) {
    $(this).closest("tr").remove();
    var costoBorrar = parseFloat($(this).closest("tr")[0].cells[3].textContent);
    costoTotal -= costoBorrar;
    $('#itemModificarTotal').text(parseFloat(costoTotal).toFixed(2));
});

function cambioProductoRegistrar() {
    var productoid = $('#productoCompraRegistrar').val();
    $.ajax({
        url: $('#URL_ObtenerProductoPorID').val(),
        type: 'post',
        data: "productoID=" + productoid,
        dataType: "json",
        success: function (data) {
            if (data.result) {
                var costo = parseFloat(data.value.precio).toFixed(2);
                costoProductoRegistrar = costo;
                $('#cantidadCompraRegistrar').val('1');
                var cantidad = $('#cantidadCompraRegistrar').val();
                var subtotal = parseFloat(costo * cantidad).toFixed(2);
                $('#costoCompraRegistrar').val(subtotal);
            } else {
                console.log('ERROR al consultar el precio');
            }
        }
    });
}

function cambioProductoModificar() {
    var productoid = $('#productoCompraModificar').val();
    $.ajax({
        url: $('#URL_ObtenerProductoPorID').val(),
        type: 'post',
        data: "productoID=" + productoid,
        dataType: "json",
        success: function (data) {
            if (data.result) {
                var costo = parseFloat(data.value.precio).toFixed(2);
                costoProductoRegistrar = costo;
                $('#cantidadCompraModificar').val('1');
                var cantidad = $('#cantidadCompraModificar').val();
                var subtotal = parseFloat(costo * cantidad).toFixed(2);
                $('#costoCompraModificar').val(subtotal);
            } else {
                console.log('ERROR al consultar el precio');
            }
        }
    });
}

function cambioCantidadRegistrar() {
    var cantidad = $('#cantidadCompraRegistrar').val();
    var subtotal = parseFloat(cantidad * costoProductoRegistrar).toFixed(2);
    $('#costoCompraRegistrar').val(subtotal);
}

function cambioCantidadModificar() {
    var cantidad = $('#cantidadCompraModificar').val();
    var subtotal = parseFloat(cantidad * costoProductoRegistrar).toFixed(2);
    $('#costoCompraModificar').val(subtotal);
}

function addItem() {
    if (validarAddItem() == false) {
        return false;
    }
    var nombre = $("#productoCompraRegistrar option:selected").text();
    var cantidad = $('#cantidadCompraRegistrar').val();
    var unidad = $("#unidadCompraRegistrar option:selected").text();
    var costo = $('#costoCompraRegistrar').val();
    var row = "<tr>" +
                "<td>" + nombre + "</td>" +
                "<td>" + unidad + "</td>" +
                "<td>" + cantidad + "</td>" +
                "<td>" + parseFloat(costo).toFixed(2) + "</td>"+
                '<td><input type="button" class="btnBorrar btn btn-danger" value="Eliminar"></td>'+
        "</tr>";
    $('#itemCompra > tbody').append(row);

    costoTotal += parseFloat(costo);
    $('#itemRegistrarTotal').text(parseFloat(costoTotal).toFixed(2));

    $('#productoCompraRegistrar').val('');
    $('#cantidadCompraRegistrar').val('');
    $('#unidadCompraRegistrar').val('');
    $('#costoCompraRegistrar').val('0.00');
    costoProductoRegistrar = 0.00;
};

function addItemModificar() {
    if (validarAddItemModificar() == false) {
        return false;
    }
    var nombre = $('#productoCompraModificar option:selected').text();
    var cantidad = $('#cantidadCompraModificar').val();
    var unidad = $('#unidadCompraModificar option:selected').text();
    var costo = $('#costoCompraModificar').val();
    var row = "<tr>" +
        "<td>" + nombre + "</td>" +
        "<td>" + unidad + "</td>" +
        "<td>" + cantidad + "</td>" +
        "<td>" + parseFloat(costo).toFixed(2) + "</td>" +
        '<td><input type="button" class="btnBorrar btn btn-danger" value="Eliminar"></td>' +
        "</tr>";
    $('#itemCompraModificar > tbody').append(row);

    costoTotal += parseFloat(costo);
    $('#itemModificarTotal').text(parseFloat(costoTotal).toFixed(2));
    $('#productoCompraModificar').val('');
    $('#cantidadCompraModificar').val('');
    $('#unidadCompraModificar').val('');
    $('#costoCompraModificar').val('0.00');
    costoProductoRegistrar = 0.00;
};

function clearDataCompra() {
    $('#productoCompraRegistrar').val('');
    $('#cantidadCompraRegistrar').val('');
    $('#unidadCompraRegistrar').val('');
    $('#costoCompraRegistrar').val('0.00');
    $('#itemCompra tbody').empty();
    itemsProductos = [];
}

function clearDataCompraModificar() {
    $('#productoCompraModificar').val('');
    $('#cantidadCompraModificar').val('');
    $('#unidadCompraModificar').val('');
    $('#costoCompraModificar').val('0.00');
    $('#itemCompraModificar tbody').empty();
    itemsProductos = [];
}

function cerrarModal() {
    clearDataCompra();
    $('#itemCompra tbody').empty();
    costoTotal = 0.00;
}

$("#btnRegistrarCompraModal").on("click", function () {
    var Compra = new Object();

    Compra.proveedorID = $('#proveedorCompraRegistrar').val();
    Compra.costoTotal = costoTotal;

    var row = document.getElementById('itemCompra').rows.length;
    for (i = 1; i < row; i++) {
        var item = new Object();
        item.nombre = document.getElementById("itemCompra").rows[i].cells.item(0).innerHTML;
        item.unidadMedida = document.getElementById("itemCompra").rows[i].cells.item(1).innerHTML;
        item.cantidad = Number(document.getElementById("itemCompra").rows[i].cells.item(2).innerHTML);
        item.costo = parseFloat(document.getElementById("itemCompra").rows[i].cells.item(3).innerHTML);
        itemsProductos.push(item);
    }

    Compra.items = itemsProductos;
    Compra.estado = "activo";
    $.ajax({
        type: 'post',
        url: 'Compra/RegistrarCompra',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(Compra),
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            if (data.result == "success") {
                //Escondiendo el Modal
                $("#modalRegistrarCompra").modal('hide');
                //Limpiando los Campos de Texto
                clearDataCompra();
                //Recargar Tabla
                $('.datatable-compra').dataTable().fnDraw();
                //Mostrando el Mensaje de Exito
                Swal.fire({
                    title: '<strong>Listo!</strong>',
                    icon: 'success',
                    html:
                        'Compra Registrado Satisfactoriamente',
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

$('#tableCompra').on('click', '.btnModificarCompra', function (e) {
    clearDataCompraModificar();
    costoTotal = 0.00;
    e.preventDefault();
    var compraID = $(this).attr('data-compra-id');
    $.ajax({
        url: $("#URL_ObtenerCompraPorID").val(),
        type: 'post',
        data: "idcompra=" + compraID,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            if (data.result == "success") {
                var compra = data.value.compra;
                var itemscompra = compra.items;
                $("#idCompraModificar").val(compra.id)
                $("#proveedorCompraModificar").val(compra.proveedorID);
                itemscompra.forEach(c => {
                    var row = "<tr>" +
                        "<td>" + c.nombre + "</td>" +
                        "<td>" + c.unidadMedida + "</td>" +
                        "<td>" + c.cantidad + "</td>" +
                        "<td>" + parseFloat(c.costo).toFixed(2) + "</td>" +
                        '<td><input type="button" class="btnBorrar btn btn-danger" value="Eliminar"></td>' +
                        "</tr>";
                    $('#itemCompraModificar > tbody').append(row);
                    costoTotal += c.costo;
                });
                $('#itemModificarTotal').text(parseFloat(costoTotal).toFixed(2));
                $("#modalModificarCompra").modal('show');
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

$("#btnModificarCompraModal").on("click", function () {
    var Compra = new Object();

    Compra.id = $('#idCompraModificar').val();
    Compra.proveedorID = $('#proveedorCompraModificar').val();
    Compra.costoTotal = costoTotal;

    var row = document.getElementById('itemCompraModificar').rows.length;
    for (i = 1; i < row; i++) {
        var item = new Object();
        item.nombre = document.getElementById("itemCompraModificar").rows[i].cells.item(0).innerHTML;
        item.unidadMedida = document.getElementById("itemCompraModificar").rows[i].cells.item(1).innerHTML;
        item.cantidad = Number(document.getElementById("itemCompraModificar").rows[i].cells.item(2).innerHTML);
        item.costo = parseFloat(document.getElementById("itemCompraModificar").rows[i].cells.item(3).innerHTML);
        itemsProductos.push(item);
    }

    Compra.items = itemsProductos;

    $.ajax({
        url: 'Compra/ActualizarCompra',
        type: 'post',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(Compra),
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            if (data.result == "success") {
                //Escondiendo el Modal
                $("#modalModificarCompra").modal('hide');
                //Limpiando los Campos de Texto
                clearDataCompraModificar();
                //Recargar Tabla
                $('.datatable-compra').dataTable().fnDraw();
                //Mostrando el Mensaje de Exito
                Swal.fire({
                    title: '<strong>Listo!</strong>',
                    icon: 'success',
                    html:
                        'Compra Actualizado Satisfactoriamente',
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

$('#tableCompra').on('click', '.btnVisualizarCompra', function (e) {
    $('#itemCompraConsulta tbody').empty();
    e.preventDefault();
    var compraID = $(this).attr('data-compra-id');
    $.ajax({
        url: $("#URL_ObtenerCompraPorID").val(),
        type: 'post',
        data: "idcompra=" + compraID,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            if (data.result == "success") {
                var compra = data.value.compra;
                var proveedor = data.value.proveedor;
                var itemscompra = compra.items;
                $("#proveedorCompraConsultar").val(proveedor.nombreEmpresa);
                $("#proveedorRUCCompraConsultar").val(proveedor.ruc);
                $("#proveedorNombreCompraConsultar").val(proveedor.nombreContacto + ' ' + proveedor.apellidoContacto);
                $("#proveedorCelularCompraConsultar").val(proveedor.celularContacto);
                $("#idCompraConsultar").val(compra.id);
                itemscompra.forEach(c => {
                    var row = "<tr>" +
                        "<td>" + c.nombre + "</td>" +
                        "<td>" + c.unidadMedida + "</td>" +
                        "<td>" + c.cantidad + "</td>" +
                        "<td>" + parseFloat(c.costo).toFixed(2) + "</td>" +
                        "</tr>";
                    $('#itemCompraConsulta > tbody').append(row);
                });
                $("#modalConsultarCompra").modal('show');
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

$('#tableCompra').on('click', '.btnCambiarEstadoCompra', function (e) {
    var compraID = $(this).attr('data-compra-id');
    $.ajax({
        url: $("#URL_ObtenerCompraPorID").val(),
        type: 'post',
        data: "idcompra=" + compraID,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            if (data.result == "success") {
                var compra = data.value.compra;
                var estado = compra.estado;
                var texto = estado === "activo" ? "Desactivar" : "Activar";
                Swal.fire({
                    title: 'Modificacion de Estado',
                    text: "Desea " + texto + " la compra seleccionada",
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
                            url: $("#URL_CompraActualizarEstado").val(),
                            type: 'post',
                            data: "compraid=" + compraID + "&estadoActual=" + estado,
                            dataType: "json",
                            success: function (data, textStatus, jqXHR) {
                                if (data.result == "success") {
                                    //Recargar Tabla
                                    $('.datatable-compra').dataTable().fnDraw();
                                    //Mostrar Mensaje Final
                                    Swal.fire(
                                        'Modificado!',
                                        'Compra ' + textoFinal + ' Satisfactoriamente',
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



function validarAddItem() {
    var msj = '';
    if ($('#productoCompraRegistrar').val() == null) {
        msj += '*Seleccione un producto para agregar a la compra. <br>'
    }
    if ($('#cantidadCompraRegistrar').val() == "") {
        msj += '*Ingresar una cantidad. <br>'
    }
    if ($('#unidadCompraRegistrar').val() == null) {
        msj += '*Seleccione una unidad para agregar a la compra. <br>'
    }
    if ($('#costoCompraRegistrar').val() == "") {
        msj += '*Hubo un error al calculo del costo'
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

function validarAddItemModificar() {
    var msj = '';
    if ($('#productoCompraModificar').val() == null) {
        msj += '*Seleccione un producto para agregar a la compra. <br>'
    }
    if ($('#cantidadCompraModificar').val() == "") {
        msj += '*Ingresar una cantidad. <br>'
    }
    if ($('#unidadCompraModificar').val() == null) {
        msj += '*Seleccione una unidad para agregar a la compra. <br>'
    }
    if ($('#costoCompraModificar').val() == "") {
        msj += '*Hubo un error al calculo del costo'
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
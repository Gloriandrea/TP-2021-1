var itemsProductos = [];
var costoTotal = 0.00;
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
                { "render": function (data, type, full, meta) { return 'Nacho Meat' } },
                { "render": function (data, type, full, meta) { return '20112233445' } },
                { "render": function (data, type, full, meta) { return 'S/. ' + full.costoTotal } },
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

function addItem() {
    var nombre = $('#productoCompraRegistrar').val();
    var cantidad = $('#cantidadCompraRegistrar').val();
    var unidad = $('#unidadCompraRegistrar').val();
    var costo = $('#costoCompraRegistrar').val();
    var row = "<tr>" +
                "<td>" + nombre + "</td>" +
                "<td>" + cantidad + "</td>" +
                "<td>" + costo + "</td>"+
        "</tr>";
    $('#itemCompra > tbody').append(row);

    costoTotal += parseFloat(costo);
    var item = new Object();
    item.nombre = nombre;
    item.cantidad = parseInt(cantidad);
    item.unidadMedida = unidad;
    item.costo = parseFloat(costo);

    itemsProductos.push(item);
};

function addItemModificar() {
    var nombre = $('#productoCompraModificar').val();
    var cantidad = $('#cantidadCompraModificar').val();
    var unidad = $('#unidadCompraModificar').val();
    var costo = $('#costoCompraModificar').val();
    var row = "<tr>" +
        "<td>" + nombre + "</td>" +
        "<td>" + cantidad + "</td>" +
        "<td>" + costo + "</td>" +
        "</tr>";
    $('#itemCompraModificar > tbody').append(row);

    costoTotal += parseFloat(costo);
    var item = new Object();
    item.nombre = nombre;
    item.cantidad = parseInt(cantidad);
    item.unidadMedida = unidad;
    item.costo = parseFloat(costo);

    itemsProductos.push(item);
};

function clearDataCompra() {
    $('#productoCompraRegistrar').val('');
    $('#cantidadCompraRegistrar').val('');
    $('#unidadCompraRegistrar').val('');
    $('#costoCompraRegistrar').val('');
    $('#itemCompra tbody').empty();
    itemsProductos = [];
}

function clearDataCompraModificar() {
    $('#productoCompraModificar').val('');
    $('#cantidadCompraModificar').val('');
    $('#unidadCompraModificar').val('');
    $('#costoCompraModificar').val('');
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
    Compra.items = itemsProductos;

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
                var compra = data.value;
                var itemscompra = compra.items;
                $("#idCompraModificar").val(compra.id)
                $("#proveedorCompraModificar").val(compra.proveedorID);
                itemscompra.forEach(c => {
                    var row = "<tr>" +
                        "<td>" + c.nombre + "</td>" +
                        "<td>" + c.cantidad + "</td>" +
                        "<td>" + c.costo + "</td>" +
                        "</tr>";
                    $('#itemCompraModificar > tbody').append(row);

                    var item = new Object();

                    item.nombre = c.nombre;
                    item.cantidad = parseInt(c.cantidad);
                    item.unidadMedida = c.unidadMedida;
                    item.costo = parseFloat(c.costo);
                    costoTotal += c.costo;

                    itemsProductos.push(item);
                });
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
                var compra = data.value;
                var itemscompra = compra.items;
                $("#idCompraConsultar").val(compra.id);
                $("#proveedorCompraConsultar").val(compra.proveedorID);
                itemscompra.forEach(c => {
                    var row = "<tr>" +
                        "<td>" + c.nombre + "</td>" +
                        "<td>" + c.cantidad + "</td>" +
                        "<td>" + c.costo + "</td>" +
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
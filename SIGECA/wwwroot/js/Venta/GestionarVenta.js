var itemsProductos = [];
var costoTotal = 0.00;
$(document).ready(function () {

    $('.datatable-venta').DataTable(
        {
            dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
            "processing": true,
            "serverSide": true,
            "searching": true,
            "sort": true,
            "lengthChange": false,
            "autoWidth": false,
            "ajax": {
                "url": $('#URL_VentasListarTodos').val(),
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
                { "render": function (data, type, full, meta) { return full.codigoVenta } },
                { "render": function (data, type, full, meta) { return 'S/. ' + parseFloat(full.total).toFixed(2) } },
                {
                    "render": function (data, type, full, meta) {
                        var date = new Date(Date.parse(full.fechaVenta));
                        return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
                    }
                },
                { "render": function (data, type, full, meta) { return '<span style="color: white" class="badge ' + (full.estado == "pendiente" ? 'bg-warning' : 'bg-success') + ' ">' + full.estado.charAt(0).toUpperCase() + full.estado.slice(1) + '</span>' } },
                {
                    "render": function (data, type, full, meta) {
                        return '<button class="btn btnVisualizarCompra" style="color: #4AB6B6" data-compra-id="' + full.id + '"><img class="fas fa-eye" /></button>' +
                            '<button class="btn btnModificarCompra" style="color: #4AB6B6" data-compra-id="' + full.id + '"><img class="fas fa-edit" /></button>' +
                            '<button class="btn btnCambiarEstadoCompra" style="color: red" data-compra-id="' + full.id + '"><img class="fas fa-ban" /></button>';
                    }
                }
            ]
        }
    );
});

$("#itemVenta").on("click", ".btnBorrar", function (event) {
    $(this).closest("tr").remove();
    var costoBorrar = parseFloat($(this).closest("tr")[0].cells[2].textContent);
    costoTotal -= costoBorrar;
    $('#itemRegistrarTotal').text(parseFloat(costoTotal).toFixed(2));
});

$('input[type="radio"]').on('click', function () {
    let tipoCliente = $("input:checked").val();
    switch (tipoCliente) {
        case "usuario":
            $('#clienteForm').css('display', 'none');
            $('#usuarioForm').css('display', 'flex');
            break;
        case "cliente":
            $('#usuarioForm').css('display', 'none');
            $('#clienteForm').css('display', 'flex');
            break;
        default:
            $('#usuarioForm').css('display', 'none');
            $('#clienteForm').css('display', 'none');
            break;
    }
});

function clearDataVenta() {
    $('#usuarioRadio').prop('checked', false);
    $('#clienteRadio').prop('checked', false);
    $('#sinDocumentoRadio').prop('checked', false);
    let tipoCliente = $("input:checked").val();
    if (tipoCliente == undefined || tipoCliente == "") {
        $('#usuarioForm').css('display', 'none');
        $('#clienteForm').css('display', 'none');
    }
    $('#nombreCliente').val('');
    $('#dniCliente').val('');
    $('#productoVentaRegistrar').val('');
    $('#cantidadVentaRegistrar').val('');
    $('#costoVentaRegistrar').val('0.00');
    itemsProductos = [];
    $('#itemVenta tbody').empty();
}

function cambioProductoRegistrar() {
    var productoid = $('#productoVentaRegistrar').val();
    $.ajax({
        url: $('#URL_ObtenerProductoPorID').val(),
        type: 'post',
        data: "productoID=" + productoid,
        dataType: "json",
        success: function (data) {
            if (data.result) {
                var producto = data.value.producto;
                var costo = parseFloat(producto.precio).toFixed(2);
                costoProductoRegistrar = costo;
                $('#cantidadVentaRegistrar').val('1');
                var cantidad = $('#cantidadVentaRegistrar').val();
                var subtotal = parseFloat(costo * cantidad).toFixed(2);
                $('#costoVentaRegistrar').val(subtotal);
            } else {
                console.log('ERROR al consultar el precio');
            }
        }
    });
}

function addItem() {
    if (validarAddItem() == false) {
        return false;
    }
    var nombre = $("#productoVentaRegistrar option:selected").text();
    var cantidad = $('#cantidadVentaRegistrar').val();
    var costo = $('#costoVentaRegistrar').val();
    var row = "<tr>" +
        "<td>" + nombre + "</td>" +
        "<td>" + cantidad + "</td>" +
        "<td>" + parseFloat(costo).toFixed(2) + "</td>" +
        '<td><input type="button" class="btnBorrar btn btn-danger" value="Eliminar"></td>' +
        "</tr>";
    $('#itemVenta > tbody').append(row);

    costoTotal += parseFloat(costo);
    $('#itemRegistrarTotal').text(parseFloat(costoTotal).toFixed(2));

    $('#productoCompraRegistrar').val('');
    $('#cantidadCompraRegistrar').val('');
    $('#unidadCompraRegistrar').val('');
    $('#costoCompraRegistrar').val('0.00');
    costoProductoRegistrar = 0.00;
};

function validarAddItem() {
    var msj = '';
    if ($('#productoVentaRegistrar').val() == null) {
        msj += '*Seleccione un producto para agregar a la compra. <br>'
    }
    if ($('#cantidadVentaRegistrar').val() == "") {
        msj += '*Ingresar una cantidad. <br>'
    }
    if ($('#costoVentaRegistrar').val() == "") {
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

function cerrarModal() {
    clearDataVenta();
    $('#itemVenta tbody').empty();
    costoTotal = 0.00;
}

function cambioCantidadRegistrar() {
    var cantidad = $('#cantidadVentaRegistrar').val();
    var subtotal = parseFloat(cantidad * costoProductoRegistrar).toFixed(2);
    $('#costoVentaRegistrar').val(subtotal);
}

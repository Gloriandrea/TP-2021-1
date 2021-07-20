var subtotal = 0.0;
var total = 0.0;
var itemsProductos = [];
$(document).ready(function () {
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.getItem(`cartId${i}`) != null) {
            var producto = JSON.parse(localStorage.getItem(`cartId${i}`));
            var row = "<tr>" +
                '<th class="pl-0 border-0" scope="row">' +
                '<div class="media align-items-center">' +
                '<a class="reset-anchor d-block animsition-link" href="detail.html"><img src="' + producto.urlImagen + '" alt="..." width="70" /></a>' +
                '<div class="media-body ml-3"><strong class="h6"><a class="reset-anchor animsition-link" href="javascript:void(0);">' + producto.nombre + '</a></strong></div>' +
                '</div>' +
                '</th>' +
                '<td class="align-middle border-0">' + '<p id="' + `cartId${i}-precio` + '" class="mb-0 small">S/. ' + parseFloat(producto.precio).toFixed(2) + '</p>' + '</td>' +
                '<td class="align-middle border-0">' +
                '<div class="border d-flex align-items-center justify-content-between px-3">' +
                '<span class="small text-uppercase text-gray headings-font-family">Cantidad</span>' +
                '<div class="quantity">' + '<button class="dec-btn p-0"><i class="fas fa-caret-left"></i></button>' + '<input onchange="CambiarCantidad(`' + `cartId${i}` + '`)" id="' + `cartId${i}-cantidad` + '" class="form-control form-control-sm border-0 shadow-0 p-0" type="text" value="1" />' +
                '<button class="inc-btn p-0"><i class="fas fa-caret-right"></i></button>' +
                '</div>' +
                '</div>' +
                '</td>' +
                '<td class="align-middle border-0">' +
                '<p id="' + `cartId${i}-total` + '" class="mb-0 small">S/. ' + parseFloat(producto.precio).toFixed(2) + '</p>' +
                '</td>' +
                '<td class="align-middle border-0"><a  class="btnBorrar reset-anchor" onclick="eliminarCompraCarrito(`' + `cartId${i}` + '`)" href="javascript:void(0);"><i class="fas fa-trash-alt small text-muted"></i></a></td>' +
                "</tr>";
            $('#carritoTable > tbody').append(row);
            subtotal += producto.precio;
            total += producto.precio;
        }
    }
   
    $('#carrSubtotal').html("S/. " +parseFloat(subtotal).toFixed(2));
    $('#carrTotal').html("S/. " + parseFloat(total).toFixed(2));
})

function CambiarCantidad(cartid) {
    var precio = Number($('#' + cartid + '-precio').html().replace("S/. ", ""));
    var cantidad = Number($('#' + cartid + '-cantidad').val());
    var total = precio * cantidad;
    $(`#${cartid}-total`).html(`S/. ${parseFloat(total).toFixed(2)}`);
    subtotal = 0.0;
    total = 0.0;
    var row = document.getElementById('carritoTable').rows.length;
    for (i = 1; i < row; i++) {
        var id = document.getElementById("carritoTable").rows[i].cells.item(3).innerHTML.split('\"')[1];
        subtotal += Number($('#' + id).html().replace("S/. ", ""));
        total += Number($('#' + id).html().replace("S/. ", ""));
    }
    $('#carrSubtotal').html("S/. " + parseFloat(subtotal).toFixed(2));
    $('#carrTotal').html("S/. " + parseFloat(total).toFixed(2));
    $('#contadorItems').text(localStorage.length);
}

function eliminarCompraCarrito(key) {
    localStorage.removeItem(key);
    $('#contadorItems').text(localStorage.length);
}

$("#carritoTable").on("click", ".btnBorrar", function (event) {
    $(this).closest("tr").remove();
    var costoBorrar = parseFloat($(this).closest("tr")[0].cells[3].textContent.replace("S/. ", ""));
    subtotal -= costoBorrar;
    total = subtotal;
    $('#carrSubtotal').html("S/. " + parseFloat(subtotal).toFixed(2));
    $('#carrTotal').html("S/. " + parseFloat(total).toFixed(2));
});

function procesarPago() {
    $('#modalRegistrarVenta').modal('show');
    $('#clienteDatos').css("display", "flex");
    $('#pay_pal_opcion').css("display", "none");
}

function registrarVentaTemp() {
    $('#clienteDatos').css("display", "none");
    $('#pay_pal_opcion').css("display", "block");
    $('#pay_pal_opcion').addClass("animate__animated animate__zoomIn animate__fast");
}

function registrarVenta() {
    var Venta = new Object();
    var datos = new Object();
    datos.nombres = $('#nombreCliente').val();
    datos.apellidos = $('#apellidoCliente').val();
    datos.correo = $('#correoCliente').val();
    datos.telefono = $('#telefonoCliente').val();
    datos.direccion = $('#direccionCliente').val();
    Venta.datos = datos;
    var newTotal = 0.0;
    if ($('#presencialRadio').is(':checked')) {
        Venta.tipo = "presencial";
    }
    if ($('#onlineRadio').is(':checked')) {
        Venta.tipo = "online";
    }
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.getItem(`cartId${i}`) != null) {
            var producto = JSON.parse(localStorage.getItem(`cartId${i}`));
            var item = new Object();
            item.productoID = producto.id;
            item.cantidad = Number($('#' + `cartId${i}-cantidad`).val());
            item.subtotal = item.cantidad * parseFloat(producto.precio);
            newTotal += item.subtotal;
            itemsProductos.push(item);
        }
    }
    Venta.total = parseFloat(newTotal);
    Venta.tipoCliente = "Cliente";
    Venta.estado = "delivery";
    Venta.items = itemsProductos;
    $.ajax({
        type: 'post',
        url: 'Carrito/RegistrarVenta',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(Venta),
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            if (data.result == "success") {
                var venta = data.value;
                $("#modalRegistrarVenta").modal('hide');
                clearDataVenta();
                Swal.fire({
                    title: '<strong>Listo!</strong>',
                    icon: 'success',
                    html:
                        'Venta Registrado Satisfactoriamente',
                    showCloseButton: true,
                    showCancelButton: false,
                    focusConfirm: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText:
                        '<i class="fa fa-thumbs-up"></i> Continuar',
                    confirmButtonAriaLabel: 'Continuar',
                });
                window.location.href = `/Pago?ventaid=${venta.id}`;
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
}

function clearDataVenta() {
    $('#presencialRadio').prop('checked', false);
    $('#onlineRadio').prop('checked', false);
    itemsProductos = [];
    $('#carritoTable tbody').empty();
    localStorage.clear()
    $('#contadorItems').text(0);
}
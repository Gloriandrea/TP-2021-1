var subtotal = 0.0;
var total = 0.0;
$(document).ready(function () {
    for (var i = 0; i < localStorage.length; i++) {
        var producto = JSON.parse(localStorage.getItem(`cartId${i}`));
        var row = "<tr>" +
                '<th class="pl-0 border-0" scope="row">' +
                    '<div class="media align-items-center">' +
                            '<a class="reset-anchor d-block animsition-link" href="detail.html"><img src="https://www.ocu.org/-/media/ocu/images/themes/alimentacion/alimentos/tips/pollo%20guia%20para%20elegir%20y%20conservar/456844_thumbnail.jpg?rev=0e3d5afb-0096-4cbb-8cb9-681c40b3931b&hash=BFA0625F79DEFA51156AAB8C93A66D41" alt="..." width="70" /></a>' +
                        '<div class="media-body ml-3"><strong class="h6"><a class="reset-anchor animsition-link" href="javascript:void(0);">'+ producto.nombre +'</a></strong></div>' +
                    '</div>' +
                    '</th>' +
                    '<td class="align-middle border-0">' + '<p id="' + `cartId${i}-precio` +'" class="mb-0 small">S/. ' + parseFloat(producto.precio).toFixed(2) + '</p>' + '</td>' +
                    '<td class="align-middle border-0">' +
                        '<div class="border d-flex align-items-center justify-content-between px-3">' +
                        '<span class="small text-uppercase text-gray headings-font-family">Cantidad</span>' +
                        '<div class="quantity">' + '<button class="dec-btn p-0"><i class="fas fa-caret-left"></i></button>' + '<input onchange="CambiarCantidad(`' + `cartId${i}` + '`)" id="' + `cartId${i}-cantidad` +'" class="form-control form-control-sm border-0 shadow-0 p-0" type="text" value="1" />' +
                        '<button class="inc-btn p-0"><i class="fas fa-caret-right"></i></button>' +
                        '</div>' +
                        '</div>' +
                    '</td>' +
                    '<td class="align-middle border-0">' +
                    '<p id="'+ `cartId${i}-total` +'" class="mb-0 small">S/. '+ parseFloat(producto.precio).toFixed(2) +'</p>' +
                    '</td>' +
                '<td class="align-middle border-0"><a  class="btnBorrar reset-anchor" onclick="eliminarCompraCarrito(`' + `cartId${i}` + '`)" href="javascript:void(0);"><i class="fas fa-trash-alt small text-muted"></i></a></td>' +
            "</tr>";
        $('#carritoTable > tbody').append(row);
        subtotal += producto.precio;
        total += producto.precio;
    }
    $('#carrSubtotal').html("S/. " +parseFloat(subtotal).toFixed(2));
    $('#carrTotal').html("S/. "+parseFloat(total).toFixed(2));
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
}

function eliminarCompraCarrito(key) {
    localStorage.removeItem(key);
}

$("#carritoTable").on("click", ".btnBorrar", function (event) {
    $(this).closest("tr").remove();
    var costoBorrar = parseFloat($(this).closest("tr")[0].cells[3].textContent.replace("S/. ", ""));
    subtotal -= costoBorrar;
    total = subtotal;
    $('#carrSubtotal').html("S/. " + parseFloat(subtotal).toFixed(2));
    $('#carrTotal').html("S/. " + parseFloat(total).toFixed(2));
});
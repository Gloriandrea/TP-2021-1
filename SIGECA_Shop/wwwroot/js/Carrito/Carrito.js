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
                        '<div class="quantity">' + '<button class="dec-btn p-0"><i class="fas fa-caret-left"></i></button>' + '<input onblur="CambiarCantidad(`' + `cartId${i}` + '`)" id="' + `cartId${i}-cantidad` +'" class="form-control form-control-sm border-0 shadow-0 p-0" type="text" value="1" />' +
                        '<button class="inc-btn p-0"><i class="fas fa-caret-right"></i></button>' +
                        '</div>' +
                        '</div>' +
                    '</td>' +
                    '<td class="align-middle border-0">' +
                    '<p id="'+ `cartId${i}-total` +'" class="mb-0 small">S/.'+ parseFloat(producto.precio).toFixed(2) +'</p>' +
                    '</td>' +
                    '<td class="align-middle border-0"><a class="reset-anchor" href="#"><i class="fas fa-trash-alt small text-muted"></i></a></td>' +
            "</tr>";
        $('#carritoTable > tbody').append(row);
    }
})

function CambiarCantidad(cartid, cantidad) {
    var precio = Number($('#' + cartid + '-precio').html().replace("S/. ",""));
    var total = precio * cantidad;
    $(`#${cartid}-total`).html(`S/. ${parseFloat(total).toFixed(2)}`);
}

function eliminarCompraCarrito(key) {
    localStorage.removeItem(key);
}

//onclick = "CambiarCantidad(`' + `cartId${i}` + '`)"
function consultarVenta() {
    var codigo = $('#codigoSeguimiento').val();
    console.log('codigo de venta:', codigo);
    $.ajax({
        url: 'Tracking/ObtenerProductoPorId',
        type: 'post',
        data: "productoID=" + codigo,
        dataType: "json",
        success: function (data) {
            if (data.result == "success") {
                var venta = data.value.venta;
                var producto = data.value.productos;
                var itemVenta = venta.items;
                console.log('data producto: ', producto);
                console.log('data venta: ', venta);
                console.log('data items venta: ', itemVenta);
                var row = '';
                row += "<div>" +
                    '<div class="card-body">' +
                    '<h6 id="idventa">ID de la Orden: ' + venta.codigoVenta + '</h6>' +
                    '<article class="card">' +
                    '<div class="card-body row">' +
                    ' <div class="col"> <strong>Fecha de registro:</strong> <br>' + venta.fechaVenta + '</div>' +
                    '<div class="col"> <strong>Direccion para:</strong> <br> | <i class="fa fa-phone"></i>  </div>' +
                    '<div id="estado" class="col"> <strong>Estado:</strong> <br>' + venta.estado + ' </div>' +
                    '</div>' +
                    '</article>' +
                    '<div class="track">' +

                    '<div class="step active"> <span class="icon"> <i class="fa fa-user"></i> </span> <span class="text">Venta Cobrado</span> </div>' +
                    '<div class="step "> <span class="icon"> <i class="fa fa-truck"></i> </span> <span class="text"> En camino </span> </div>' +
                    '<div class="step"> <span class="icon"> <i class="fa fa-box"></i> </span> <span class="text">Entregado</span> </div>' +
                    '</div>' +
                    '<hr>' + '<ul class="row">';
                producto.forEach(p => {
                    for (var i = 0; i < itemVenta.length; i++) {
                        if (p.id == itemVenta[i].productoID) {
                            row += '<li class="col-md-4">' +
                                '<figure class="itemside mb-3">' +
                                '<div class="aside"><img src="' + p.urlImagen + '" class="img-sm border"></div>' +
                                '<figcaption class="info align-self-center">' +
                                '<p class="title">' + p.nombre + '<br>Cantidad: ' + itemVenta[i].cantidad + '</p> <span class="text-muted">S/. ' + itemVenta[i].subTotal + '</span>' +
                                '</figcaption>' +
                                '</figure>' +
                                '</li>';
                        }
                    }
                });
                row += '</ul>' +
                    '<hr> <a href="@Url.Action("Index", "Catalogo")" class="btn btn-warning" data-abc="true"> <i class="fa fa-chevron-left"></i> Volver al Catalogo</a>' +
                    '</div>' +
                    "</div>";
                $('#idtracking >div').append(row);

            } else {
                console.log('ERROR en Mostrar informacion!!');
            }
        }
    });
}
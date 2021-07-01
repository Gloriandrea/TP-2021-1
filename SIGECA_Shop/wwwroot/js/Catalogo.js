function AgregarCarrito(id) {
    var productoid = id;

    console.log('id producto add to cart',productoid);
    $.ajax({
        url: 'Catalogo/ObtenerProductoPorId',
        type: 'post',
        data: "productoID=" + productoid,
        dataType: "json",
        success: function (data) {
            if (data.result) {
                var producto = data.value;
                GuardarLocal(producto);
                $('#contadorItems').text(localStorage.length);
            } else {
                console.log('ERROR al consultar el producto');
            }
        }
    });
}

function GuardarLocal(producto) {
    var cartId;
    if (localStorage.length == 0) {
        cartId = 'cartId0';
        localStorage.setItem(cartId, JSON.stringify(producto));
    } else {
        for (var i = 0; i < localStorage.length; i++) {
            if (JSON.stringify(producto) == localStorage.getItem(`cartId${i}`)) {
                Swal.fire({
                    title: 'Producto ya se encuentra en carrito de compra',
                    text: "Desea ir a ver carrito de compras?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ir Carrito Compra'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = 'Carrito';
                    }
                })
                return false;
            }
        }
        cartId = `cartId${localStorage.length}`;
        localStorage.setItem(cartId, JSON.stringify(producto));
    }
}

function MostrarInformacion(id) {
    var productoid = id;
    console.log('Producto id en catalogo:', productoid);
    $.ajax({
        url: 'Catalogo/ObtenerProductoPorId',
        type: 'post',
        data: "productoID=" + productoid,
        dataType: "json",
        success: function (data) {
            if (data.result) {
                var producto = data.value;
                $("#nombreProducto").text(producto.nombre);
                $("#precioProducto").text(producto.precio);
                $("#stockProducto").text(producto.stock);
                $("#descripcionProducto").text(producto.descripcion);
                $("#idProducto").val(producto.id);

                $("#productView").modal('show');
            } else {
                console.log('ERROR en Mostrar informacion!!');
            }
        }
    });
}
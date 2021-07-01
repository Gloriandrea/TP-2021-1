var productos = [];

$(document).ready(function () {
    $('.datatable-peladuria').DataTable(
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
                        return '<button class="btn btnVisualizarPeladuria" style="color: #4AB6B6" data-peladuria-id="' + full.id + '"><img class="fas fa-eye" /></button>';
                    }
                }
            ]
        });
});

function cambiarCantidadPeluderia() {
    var cantidad = Number($('#cantidadRegistrarPeladuria').val());
    $('#pollo1-cantidad').html(`${cantidad*1}`);
    $('#pollo2-cantidad').html(`${cantidad * 2}`);
    $('#pollo3-cantidad').html(`${cantidad * 2}`);
    $('#pollo4-cantidad').html(`${cantidad * 1}`);
}

function clearDataPeladuria() {
    $('#cantidadRegistrarPeladuria').val('');
    $('#pollo1-cantidad').html(0);
    $('#pollo2-cantidad').html(0);
    $('#pollo3-cantidad').html(0);
    $('#pollo4-cantidad').html(0);
    $('#pesoMenudencia').val('');
    productos = [];
}

function cerrarModal() {
    $('#cantidadRegistrarPeladuria').val('');
    $('#pesoMenudencia').val('');
    productos = [];
}

function registrarProductos() {
    var row = document.getElementById('itemProductos').rows.length;
    for (i = 1; i < row; i++) {
        var producto = new Object();
        producto.nombre = $('#pollo' + `${i}` + '-nombre').html();
        if (producto.nombre == 'Menudencia') {
            producto.unidadMedida = 'Kilogramos';
            producto.stock = 0;
        }
        else {
            producto.unidadMedida = 'Unidades';
            producto.stock = Number($('#pollo' + `${i}` + '-cantidad').html())
        }
        producto.tipoVenta = '';
        producto.urlImagen = '';
        producto.codigoQR = '';
        producto.precio = 0.0;
        producto.categoriaID = '6081f464a0b5022eac478209';
        productos.push(producto);
    }
    $.ajax({
        type: 'post',
        url: 'Peladuria/RegistrarProductosPeladuria',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(productos),
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            if (data.result == "success") {
                $("#modalRegistrarProducto").modal('hide');
                clearDataPeladuria();
                $('.datatable-peladuria').dataTable().fnDraw();
                Swal.fire({
                    title: '<strong>Listo!</strong>',
                    icon: 'success',
                    html:
                        'Productos Registrados Satisfactoriamente',
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
}
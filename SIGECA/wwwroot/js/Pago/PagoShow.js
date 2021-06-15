$(function () {
    $("#btnRegistrarPago").on("click", function imprim1(imp1) {
        var printContents = document.getElementById('imp1').innerHTML;
        w = window.open();
        w.document.write(printContents);
        w.document.close(); // necessary for IE >= 10
        w.focus(); // necessary for IE >= 10
        w.print();
        w.close();
        return true;
    });
});


//$(function () {
//    $('#tablaVentaPorCódigo').on('click', 'btnBuscarVenta', function (e) {
//        e.preventDefault();
//        var codigoVenta = $(this).attr('data-usuario-id');
//        $.ajax({
//            url: $("#URL_ObtenerVentaPorCodigoVenta").val(),
//            type: 'post',
//            data: "codigoVenta=" + codigoVenta,
//            dataType: "json",
//            success: function (data, textStatus, jqXHR) {
//                if (data.result == "success") {
//                    var venta = data.value;
//                    $("#tablaVentaPorCódigo").load(data);                    
//                }
//                else {
//                    console.log("ERROR AL OBTENER LOS DATOS");
//                }
//            },
//            error: function (jqXHR, textStatus, errorThrown) {
//                console.log("ERROR AL OBTENER LOS DATOS");
//            }
//        });
//    });
//});









//$(document).ready(function () {
//$('.datatable-ventas').DataTable(
//    {
//        dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
//        "processing": true,
//        "serverSide": true,
//        "searching": true,
//        "sort": true,
//        "lengthChange": false,
//        "autoWidth": false,
//        "ajax": {
//            "url": $('#URL_VentaListar').val(),
//            "type": "POST",
//            "error": function () {
//                document.location.reload();
//            }
//        },
//        "oLanguage": {
//            "oPaginate": {
//                "sFirst": "Primero",
//                "sNext": "Siguiente",
//                "sPrevious": "Anterior",
//                "sLast": "Ultimo"
//            },
//            "sInfo": "_START_ a _END_ de _TOTAL_ registros",
//            "sLengthMenu": "Mostrar _MENU_ registros",
//            "sSearch": "Buscar:",          
//            "sProcessing": "",
//            "sInfoFiltered": "",
//            "sInfoFiltered": '',
//            "sZeroRecords": "No se encontro registros",
//            "sInfoEmpty": "No hay registros para mostrar"
//        },
//        "serverParams": function (setting) {

//        },
//        "columns": [
//            { "data": "codigoVenta" },
//            { "render": function (data, type, full, meta) { return full.id + ' ' + full.DataTable.columns; } },
//            { "data": "tipo" },
//            { "data": "fechaVenta" },
//            { "data": "total" },
//            {
//                "render": function (data, type, full, meta) {
//                    return '<button class="btn btnVisualizarUsuario" data-usuario-id="' + full.id + '"><img class="fas fa-eye" /></button>' +
//                        '<button class="btn btnModificarUsuario" data-usuario-id="' + full.id + '"><img class="fas fa-edit" /></button>' +
//                        '<button class="btn btnCambiarEstadoUsuario" data-usuario-id="' + full.id + '"><img class="fas fa-ban" /></button>';;
//                }
//            }
//        ]
//    });
//});
$(document).ready(function () {
    $('.datatableCatalogo').DataTable(
        {
            dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
            "processing": true,
            "serverSide": true,
            "searching": true,
            "sort": true,
            "lengthChange": false,
            "autoWidth": false,
            "ajax": {
                "url": $('#URL_OfertasListarTodos').val(),
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
            },
            "columns": [
                { "render": function (data, type, full, meta) { return full.nombrePorducto } },
                { "render": function (data, type, full, meta) { return full.tipoVenta } },
                { "render": function (data, type, full, meta) { return full.stockProducto } },
                { "render": function (data, type, full, meta) { return full.precioProducto } },
                { "data": "stockOferta" },
                { "data": "tipoDescuento" },
                { "data": "estado" },
                {
                    "render": function (data, type, full, meta) {
                        return  '<button class="btn btnConsultarOferta" data-producto-id="' + full.productoID + '"><img class="fas fa-eye" /></button>' +
                                '<button class="btn btnModificarOferta1" data-producto-id="' + full.productoID + '"><img class="fas fa-edit" /></button>' +
                                '<button class="btn btnCambiarEstadoCompra" style="color: red" data-producto-id="' + full.productoID + '"><img class="fas fa-ban" /></button>';;
                    }
                }
            ]
        });
});

//trae data de producto y llena campos en modal registrar oferta
function registrarOferta1() {
    console.log('entro a registrar oferta')
    var productoid = $('#productoRegistrarOferta').val();
    console.log('prod id', productoid)

    $.ajax({
        url: $('#URL_ObtenerProductoPorID').val(),
        type: 'post',
        data: "productoID=" + productoid,
        dataType: "json",
        success: function (data) {
            if (data.result) {
                var producto = data.value.producto;
                var costo = parseFloat(producto.precio).toFixed(2);
                $('#precioProducto').val(costo);
                var categoria = (data.value.category.nombre);
                $('#categoriaProducto').val(categoria);

            } else {
                console.log('ERROR al consultar el precio');
            }
        }
    });
}

//trae data de producto y llena campos en modal modificar oferta
function registrarOferta2() {
    console.log('entro a registrar oferta')
    var productoid = $('#productoModOferta').val();
    console.log('prod id', productoid)
    $.ajax({
        url: $('#URL_ObtenerProductoPorID').val(),
        type: 'post',
        data: "productoID=" + productoid,
        dataType: "json",
        success: function (data) {
            if (data.result) {
                var producto = data.value.producto;
                var costo = parseFloat(producto.precio).toFixed(2);
                $('#precioProductoOferta').val(costo);
                var categoria = (data.value.category.nombre);
                $('#categoriaProductoOferta').val(categoria);
                
            } else {
                console.log('ERROR al consultar el precio');
            }
        }
    });
}

//ocultando mostrando content descuento
$("#btnAddProduct").click(function () {
    $("#div_Porcentaje").fadeOut();
    $("#div_Multiplicidad").fadeOut();
    console.log("en btn add")
})
$("#ddl_Descuento").change(function () {
    var ddlSelectedTipoComprobante = "ninguno";
    var ddlSelectedTipoComprobante = $('#ddl_Descuento').val();
    console.log($('#ddl_Descuento').val());
    if (ddlSelectedTipoComprobante == "ninguno") {
        $("#div_Porcentaje").fadeOut();
        $("#div_Multiplicidad").fadeOut();
        console.log("entro ddl descuento nothing")
    }
    else if (ddlSelectedTipoComprobante == "porcentaje") {
        $("#div_Porcentaje").fadeIn();
        $("#div_Multiplicidad").fadeOut();
        console.log("entro ddl descuento xcentaje")
    } else if (ddlSelectedTipoComprobante == "multiplicidad") {
        $("#div_Multiplicidad").fadeIn();
        $("#div_Porcentaje").fadeOut();
        console.log("entro ddl descuento multiplicidad")
    }
});

//consultar oferta section
$('#tableCatalogo').on('click', '.btnConsultarOferta', function (e) {
    e.preventDefault();
    console.log("en btn consulta")
    var productoID = $(this).attr('data-producto-id');
    console.log('compra ID en consultar', productoID)
    $.ajax({
        url: $("#URL_ObtenerOfertaPorID").val(),
        type: 'post',
        data: "productoID=" + productoID,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            if (data.result == "success") {
                console.log("entro data result")
                var producto = data.value.producto;
                console.log('nomre producto', producto.id)
                var categoria = data.value.categoria;
                var oferta = data.value.oferta;

                //nombre producto
                $("#nombreProductoConsultar").val(producto.nombre);

                //precio producto
                $("#precioNormalConsultar").val(producto.precio);

                //categoria producto
                $("#categoriaConsultar").val(categoria.nombre);

                //tipo descuento
                $("#tipoDescuentoConsultar").val(oferta.tipoDescuento);

                //cantidad descuento
                $("#cantidadDescuentoConsultar").val(oferta.porcentajeDescuento);

                //fecha inicio oferta
                $("#fechaInicioOfertaConsultar").val(oferta.fechaInicio);

                //fecha vencimiento oferta
                $("#fechaVencimientoOfertaConsultar").val(oferta.fechaVencimiento);

                //estado descuento consultar
                $("#EstadoDescuentoConsultar").val(oferta.estado);

                //stock oferta consultar
                $("#stockOfertaConsultar").val(oferta.stockOferta);

                

                $("#modalConsultarOferta").modal('show');
            }
            else {
                console.log("ERROR AL OBTENER LOS DATOS 1");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("ERROR AL OBTENER LOS DATOS 2");
        }
    });
});


//modificar oferta section
$('#tableCatalogo').on('click', '.btnModificarOferta1', function (e) {
    e.preventDefault();
    //muestra o oculta campos descuento en modal mod oferta
    $("#div_Porcentaje2").fadeOut();
    $("#div_Multiplicidad2").fadeOut();
    console.log("en btn modificar oferta")
    $("#ddl_Descuento2").change(function () {
        var ddlSelectedTipoComprobante = "ninguno";
        var ddlSelectedTipoComprobante = $('#ddl_Descuento2').val();
        console.log($('#ddl_Descuento2').val());
        if (ddlSelectedTipoComprobante == "ninguno") {
            $("#div_Porcentaje2").fadeOut();
            $("#div_Multiplicidad2").fadeOut();
            console.log("entro ddl descuento 2 nothing")
        }
        else if (ddlSelectedTipoComprobante == "porcentaje") {
            $("#div_Porcentaje2").fadeIn();
            $("#div_Multiplicidad2").fadeOut();
            console.log("entro ddl descuento 2 xcentaje")
        } else if (ddlSelectedTipoComprobante == "multiplicidad") {
            $("#div_Multiplicidad2").fadeIn();
            $("#div_Porcentaje2").fadeOut();
            console.log("entro ddl descuento 2 multiplicidad")
        }
    });

    //data en modal consultar oferta
    var productoID = $(this).attr('data-producto-id');
    console.log('compra ID en modificareeeee', productoID   )
    $.ajax({
        url: $("#URL_ObtenerOfertaPorID").val(),
        type: 'post',
        data: "productoID=" + productoID,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            if (data.result == "success") {
                console.log("entro data result")
                var oferta = data.value.oferta;
                var producto = data.value.producto;
                var categoria = data.value.categoria;
                //id collection producto
                $("#productoModOferta").val(oferta.productoID)
                console.log('ID oferta MOD', oferta.productoID)
                //producto nombre
                $("#nombreProductoConsultar").val(producto.nombre);

                //stock oferta
                $("#stockOfertaModificar").val(data.value.oferta.stockOferta);

                //categoria producto
                $("#categoriaProductoOferta").val(data.value.categoria.nombre);

                //precio producto
                $("#precioProductoOferta").val(data.value.producto.precio);
              
                //var oferta = (data.value.oferta.tipoDescuento)
                $("#ddl_Descuento").val(oferta.tipoDescuento);
                console.log('tipo descuento % o multp es : ', oferta.tipoDescuento);

                $("#modalModificarOferta").modal('show');
            }
            else {
                console.log("ERROR AL OBTENER LOS DATOS 1");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("ERROR AL OBTENER LOS DATOS 2");
        }
    });
});



$(document).ready(function () {
    
    $('.datatable-catalogo').DataTable(
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
                { "render": function (data, type, full, meta) { return full.nombre } },
                { "render": function (data, type, full, meta) { return full.tipoVenta } },
                { "render": function (data, type, full, meta) { return full.precio } },
                { "render": function (data, type, full, meta) { return full.stock } },
                {
                    "render": function (data, type, full, meta) {
                        return '<button class="btn btnConsultarOfertas" data-producto-id="' + full.id + '"><img class="fas fa-eye" /></button>' +
                            '<button class="btn btnModificarOferta" data-producto-id="' + full.id + '"><img class="fas fa-edit" /></button>' +
                            '<button class="btn btnAgregarCompra" style="color: #4AB6B6" data-producto-id="' + full.id + '"><img class="fas fa-plus" /></button>' +
                            '<button class="btn btnModificarPrecio" style="color: #4AB6B6" data-producto-id="' + full.id + '"><img class="fas fa-money-check-alt" /></button>';
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
//trae data de producto y llena campos en modal modificar oferta
function registrarOferta3() {
    console.log('entro a registrar oferta')
    var productoid = $('#productoModOferta').val();
    console.log('prod id en mod oferta 3:', productoid)
    $.ajax({
        url: $('#URL_ObtenerProductoPorID').val(),
        type: 'post',
        data: "productoID=" + productoid,
        dataType: "json",
        success: function (data) {
            if (data.result) {
                var producto = data.value.producto;
                var costo = parseFloat(producto.precio).toFixed(2);
                console.log('costo regis ofer 3: ', costo)
                $('#precioProductoModOferta').val(costo);
                var categoria = (data.value.category.nombre);
                $('#categoriaProductoModOferta').val(categoria);

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

 
//CONSULTAR oferta section
$('#tableCatalogo').on('click', '.btnConsultarOfertas', function (e) {
    $('#tableTiendaDetalleProducto tbody').empty();
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
                var tienda = data.value.tienda;

                //sec1 Detalle del producto
                //nombre producto
                $("#nombreProductoConsultar").val(producto.nombre);
                //precio producto
                $("#precioNormalConsultar").val(producto.precio);
                //descripcion producto
                $("#DescripcionConsultar").val(producto.descripcion);
                //stock producto
                $("#stockConsultar").val(producto.stock);
                //END sec 1

                //sec 2 Nombre tienda hardcode
                //$("#nombreTienda").html(tienda.nombre);
                //console.log('nombre tienda: ', tienda.nombre);

                //detalle de la tienda
                var stockOfer = oferta.stockOferta;
                var tipoDcto = oferta.tipoDescuento;
                var fechaIni = oferta.fechaInicio;
                var fechaVenci = oferta.fechaVencimiento;
                var porcentDescto = oferta.porcentajeDescuento;
                var multpOf = oferta.cantidadOfrecida;
                var multpPag = oferta.cantidadPagada;
                var date = new Date(Date.parse(fechaIni));
                let a = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
                var dateb = new Date(Date.parse(fechaVenci));
                let b = dateb.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()

                if (tipoDcto == 'porcentaje') {
                    var fila = "<tr><td>" + stockOfer + "</td><td>" + porcentDescto + "%" + "</td><td>" + a + "</td><td>" + b + "</td><td>";
                    $('#tableTiendaDetalleProducto > tbody').append(fila);
                } else {
                    var fila = "<tr><td>" + stockOfer + "</td><td>" + multpOf + " x " + multpPag + "</td><td>" + a + "</td><td>" + b + "</td><td>";
                    $('#tableTiendaDetalleProducto > tbody').append(fila);
                }
                $("#modalConsultarOferta").modal('show');
            }
            else {
                Swal.fire({
                    title: '<strong>Error!</strong>',
                    icon: 'error',
                    html:
                        'Este producto no cuenta con ofertas!',
                    showCloseButton: true,
                    showCancelButton: false,
                    focusConfirm: false,
                    confirmButtonColor: '#d33',
                    confirmButtonText:
                        '<i class="fa fa-thumbs-down"></i> Volver',
                    confirmButtonAriaLabel: 'Volver',
                });
                console.log("ERROR AL OBTENER LOS DATOS 1");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

            Swal.fire({
                title: '<strong>Error!</strong>',
                icon: 'error',
                html:
                    'Este producto no cuenta con ofertas!',
                showCloseButton: false,
                focusConfirm: false,
                confirmButtonColor: '#d33',
                confirmButtonText: 'Volver',
                confirmButtonAriaLabel: 'Volver',
            });
            //END sec 2
        }
    });
});

//MODIFICAR oferta section
$('#tableCatalogo').on('click', '.btnModificarOferta', function (e) {
    $('#fechaIniModificar').datepicker({
        "format": "yyyy-mm-dd"
    });
    $('#fechaVenciModificar').datepicker({
        "format": "yyyy-mm-dd"
    });
    e.preventDefault();
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

    //data en modal modificar oferta
    var productoID = $(this).attr('data-producto-id');
    console.log('compra ID en modificareeeee', productoID)
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

                //oferta id hidden
                $("#idOfertaModificar").val(oferta.id)
                console.log('ID oferta MOD:', oferta.id)

                //id collection producto
                $("#productoModOferta1").val(producto.id)
                console.log('ID producto MOD', producto.id)
                //producto nombre
                $("#nombreProductoConsultar").val(producto.nombre);

                //categoria producto
                $("#categoriaProductoModOferta").val(categoria.nombre);

                //precio producto
                $("#precioProductoModOferta").val(producto.precio);

                $("#productoModOferta1").val(producto.id);

                //var oferta = (data.value.oferta.tipoDescuento)
                //$("#ddl_Descuento").val(oferta.tipoDescuento);
                //console.log('tipo descuento % o multp es : ', oferta.tipoDescuento);

                $("#modalModificarOferta").modal('show');
            }
            else {
                Swal.fire({
                    title: '<strong>Error!</strong>',
                    icon: 'error',
                    html:
                        'Este producto no cuenta con ofertas!',
                    showCloseButton: true,
                    showCancelButton: false,
                    focusConfirm: false,
                    confirmButtonColor: '#d33',
                    confirmButtonText:
                        '<i class="fa fa-thumbs-down"></i> Volver',
                    confirmButtonAriaLabel: 'Volver',
                });
                console.log("ERROR AL OBTENER LOS DATOS 1");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            Swal.fire({
                title: '<strong>Error!</strong>',
                icon: 'error',
                html:
                    'Este producto no cuenta con ofertas!',
                showCloseButton: false,
                focusConfirm: false,
                confirmButtonColor: '#d33',
                confirmButtonText: 'Volver',
                confirmButtonAriaLabel: 'Volver',
            });
        }
    });

});


//MODIFICAR oferta section
$('#tableCatalogo').on('click', '.btnModificarPrecio', function (e) {


    var productoID = $(this).attr('data-producto-id');
    console.log('compra ID en agregar', productoID)
    $.ajax({
        url: $("#URL_ObtenerProductoPorID").val(),
        type: 'post',
        data: "productoID=" + productoID,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            if (data.result == "success") {
                console.log("entro data result add:", productoID)

                var producto = data.value.producto;
                var categoria = data.value.category;
                //id collection producto
                $("#productoIDActualizarPrecio").val(producto.id)
                $("#productoNombreActualizarPrecio").val(producto.nombre);
                $("#StockProductoActualizarPrecio").val(producto.stock);
                $("#categoriaProductoActualizarPrecio").val(categoria.nombre);
                $("#unidadMedidaActualizarPrecio").val(producto.unidadMedida);
                $("#descripcionProductoActualizarPrecio").val(producto.descripcion);
                $("#precioProductoActualizarPrecio").val(producto.precio);



                $("#actualizarPrecioProductoModal").modal('show');
            }
            else {
                console.log("ERROR AL OBTENER LOS DATOS 1");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            Swal.fire({
                title: '<strong>Error!</strong>',
                icon: 'error',
                html:
                    'Error al Obtener los datos',
                showCloseButton: false,
                focusConfirm: false,
                confirmButtonColor: '#d33',
                confirmButtonText: 'Volver',
                confirmButtonAriaLabel: 'Volver',
            });
        }
    });
});

$('#btnActualizarPrecioProducto').on('click', function (e) {


    var productoID = $("#productoIDActualizarPrecio").val();
    var formActualizarPrecioProducto = $("#formActualizarPrecioProducto");
    console.log('compra ID en agregar', productoID)
    $.ajax({
        url: $("#URL_ActualizarPrecioProducto").val(),
        type: 'post',
        data: formActualizarPrecioProducto.serializeArray(),
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            if (data.result == "success") {
                console.log("entro data result add:", productoID)
                
                $("#productoIDActualizarPrecio").val("")
                $("#productoNombreActualizarPrecio").val("");
                $("#StockProductoActualizarPrecio").val("");
                $("#categoriaProductoActualizarPrecio").val("");
                $("#unidadMedidaActualizarPrecio").val("");
                $("#descripcionProductoActualizarPrecio").val("");
                $("#precioProductoActualizarPrecio").val("");
                $(".datatable-catalogo").dataTable().fnDraw();
                Swal.fire({
                    title: '<strong>Listo!</strong>',
                    icon: 'success',
                    html:
                        'precio Actualizado Satisfactoriamente',
                    showCloseButton: false,
                    focusConfirm: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Volver',
                    confirmButtonAriaLabel: 'Volver',
                });

                $("#actualizarPrecioProductoModal").modal('hide');
            }
            else {
                console.log("ERROR AL OBTENER LOS DATOS 1");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            Swal.fire({
                title: '<strong>Error!</strong>',
                icon: 'error',
                html:
                    'Error al Obtener los datos',
                showCloseButton: false,
                focusConfirm: false,
                confirmButtonColor: '#d33',
                confirmButtonText: 'Volver',
                confirmButtonAriaLabel: 'Volver',
            });
        }
    });
});


//AGREGAR oferta segun producto
$('#tableCatalogo').on('click', '.btnAgregarCompra', function (e) {
    $('#fechaIniRegistrar').datepicker({
        "format": "yyyy-mm-dd"
    });
    $('#fechaVenciRegistrar').datepicker({
        "format": "yyyy-mm-dd"
    });
    e.preventDefault();
     
    //muestra o oculta campos descuento en modal mod oferta
    $("#div_Porcentaje").fadeOut();
    $("#div_Multiplicidad").fadeOut();
    console.log("en btn agregar oferta")
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


    //data en modal agregar oferta
    var productoID = $(this).attr('data-producto-id');
    console.log('compra ID en agregar', productoID)
    $.ajax({
        url: $("#URL_ObtenerProductoPorID").val(),
        type: 'post',
        data: "productoID=" + productoID,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            if (data.result == "success") {
                console.log("entro data result add:", productoID)
                var oferta = data.value.oferta;
                var producto = data.value.producto;
                var categoria = data.value.category;
                //id collection producto
                $("#productoRegistrarOferta").val(producto.id)
                $("#categoriaProducto").val(categoria.nombre);
                $("#precioProducto").val(producto.precio);
              

                $("#registrarProductoOferta").modal('show');
            }
            else {
                console.log("ERROR AL OBTENER LOS DATOS 1");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            Swal.fire({
                title: '<strong>Error!</strong>',
                icon: 'error',
                html:
                    'Este producto no cuenta con ofertas!',
                showCloseButton: false,
                focusConfirm: false,
                confirmButtonColor: '#d33',
                confirmButtonText: 'Volver',
                confirmButtonAriaLabel: 'Volver',
            });
        }
    });

});

function clearDataCompra() {
    $('#precioOfertaRegistrar').val('');
    $('#ddl_Descuento').val('');
    $('#productoRegistrarOfertaTienda').val('');
    $('#fechaIniRegistrar').val('');
    $('#fechaVenciRegistrar').val('');
}


//REGISTRAR oferta
$("#btnRegistrarOferta").on("click", function () {
    //if (validarVacioCompraRegistrar() == false) {
    //    return false;
    //}

    var Oferta = new Object();
    var tdescto = $('#ddl_Descuento').val();
    var fechain = $('#fechaIniRegistrar').val().split("-");
    var fechafin = $('#fechaVenciRegistrar').val().split("-");
    //var formRegistrarOferta = $('#formRegistrarOferta');
    if (tdescto == 'porcentaje') {
        Oferta.tipoDescuento = $('#ddl_Descuento').val();
        Oferta.fechaInicio = new Date(fechain[0], fechain[1], fechain[2]);
        Oferta.fechaVencimiento = new Date(fechafin[0], fechafin[1], fechafin[2]);
        Oferta.estado = "activo";
        Oferta.stockOferta = parseInt($('#precioOfertaRegistrar').val());
        Oferta.tiendaID = $('#productoRegistrarOfertaTienda').val();
        Oferta.productoID = $('#productoRegistrarOferta').val();
        Oferta.porcentajeDescuento = parseInt($('#id_InputPorcentajeRegistrar').val());
        console.log('oferta registrar porcentaje JSON: ', Oferta);
        $.ajax({
            type: 'post',
            url: 'Catalogo/RegistrarOferta',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(Oferta),
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (data.result == "success") {
                    //Escondiendo el Modal
                    $("#registrarProductoOferta").modal('hide');
                    //Limpiando los Campos de Texto
                    clearDataCompra();
                    //Recargar Tabla
                    //$('.datatable-compra').dataTable().fnDraw();
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
                        'Error del Servidor - Status 300 RE',
                    showCloseButton: true,
                    showCancelButton: false,
                    focusConfirm: false,
                    confirmButtonColor: '#d33',
                    confirmButtonText:
                        'Volver',
                    confirmButtonAriaLabel: 'Volver',
                });
            }
        });
    } else {
        Oferta.tipoDescuento = $('#ddl_Descuento').val();
        Oferta.fechaInicio = new Date(fechain[0], fechain[1], fechain[2]);
        Oferta.fechaVencimiento = new Date(fechafin[0], fechafin[1], fechafin[2]);
        Oferta.estado = "activo";
        Oferta.stockOferta = parseInt($('#precioOfertaRegistrar').val());
        Oferta.tiendaID = $('#productoRegistrarOfertaTienda').val();
        Oferta.productoID = $('#productoRegistrarOferta').val();
        Oferta.cantidadOfrecida = parseInt($('#id_InputMultiplicidadRegistrar').val());
        Oferta.cantidadPagada = parseInt($('#id_InputCantidadPagoRegistrar').val());
        console.log('oferta registrar multiplicidad JSON: ', Oferta)
        $.ajax({
            type: 'post',
            url: 'Catalogo/RegistrarOferta',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(Oferta),
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (data.result == "success") {
                    //Escondiendo el Modal
                    $("#registrarProductoOferta").modal('hide');
                    //Limpiando los Campos de Texto
                    clearDataCompra();
                    //Recargar Tabla
                    //$('.datatable-compra').dataTable().fnDraw();
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
                        'Error del Servidor - Status 300',
                    showCloseButton: true,
                    showCancelButton: false,
                    focusConfirm: false,
                    confirmButtonColor: '#d33',
                    confirmButtonText:
                        'Volver',
                    confirmButtonAriaLabel: 'Volver',
                });
            }
        });
    }
});


//MODIFICAR oferta
$("#btnModOferta").on("click", function () {
    //if (validarVacioCompraRegistrar() == false) {
    //    return false;
    //}
   
    var Oferta = new Object();
    var tdescto = $('#ddl_Descuento2').val();
    console.log('TIPO DESCUENTO ANTES DE ENTRAR CONDICIONAL: ',tdescto)
    var fechain = $('#fechaIniModificar').val().split("-");
    var fechafin = $('#fechaVenciModificar').val().split("-");

    if (tdescto == 'porcentaje') {
        Oferta.id = $("#idOfertaModificar").val();
        Oferta.tipoDescuento = $('#ddl_Descuento2').val();
        Oferta.fechaInicio = new Date(fechain[0], fechain[1], fechain[2]);
        Oferta.fechaVencimiento = new Date(fechafin[0], fechafin[1], fechafin[2]);
        Oferta.estado = "activo";
        Oferta.stockOferta = parseInt($('#stockOfertaModificar').val());
        Oferta.tiendaID = $('#TiendaModOferta').val();
        Oferta.productoID = $('#productoModOferta1').val();
        Oferta.porcentajeDescuento = parseInt($('#id_InputPorcentajeMod').val());
        console.log('oferta registrar porcentaje JSON: ', Oferta);
        $.ajax({
            type: 'post',
            url: 'Catalogo/ActualizarOfertaPorcentaje',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(Oferta),
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (data.result == "success") {
                    //Escondiendo el Modal
                    $("#registrarProductoOferta").modal('hide');
                    //Limpiando los Campos de Texto
                    clearDataCompra();
                    //Recargar Tabla
                    //$('.datatable-compra').dataTable().fnDraw();
                    //Mostrando el Mensaje de Exito
                    Swal.fire({
                        title: '<strong>Listo!</strong>',
                        icon: 'success',
                        html:
                            'Oferta Actualizada Satisfactoriamente',
                        showCloseButton: true,
                        showCancelButton: false,
                        focusConfirm: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText:
                            'Continuar',
                        confirmButtonAriaLabel: 'Continuar',
                    });
                }
                else {
                    Swal.fire({
                        title: '<strong>Error!</strong>',
                        icon: 'error',
                        html:
                            'Lo sentimos, Ocurrió un error Inesperado - MOD',
                        showCloseButton: true,
                        showCancelButton: false,
                        focusConfirm: false,
                        confirmButtonColor: '#d33',
                        confirmButtonText:
                            'Volver',
                        confirmButtonAriaLabel: 'Volver',
                    });
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                Swal.fire({
                    title: '<strong>Error!</strong>',
                    icon: 'error',
                    html:
                        'Error del Servidor - Status 300 MOD',
                    showCloseButton: true,
                    showCancelButton: false,
                    focusConfirm: false,
                    confirmButtonColor: '#d33',
                    confirmButtonText:
                        'Volver',
                    confirmButtonAriaLabel: 'Volver',
                });
            }
        });
    } else {
        Oferta.id = $("#idOfertaModificar").val();
        Oferta.tipoDescuento = $('#ddl_Descuento2').val();
        Oferta.fechaInicio = new Date(fechain[0], fechain[1], fechain[2]);
        Oferta.fechaVencimiento = new Date(fechafin[0], fechafin[1], fechafin[2]);
        Oferta.estado = "activo";
        Oferta.stockOferta = parseInt($('#stockOfertaModificar').val());
        Oferta.tiendaID = $('#TiendaModOferta').val();
        Oferta.productoID = $('#productoModOferta1').val();
        Oferta.cantidadOfrecida = parseInt($('#id_InputMultiplicidadMod').val());
        Oferta.cantidadPagada = parseInt($('#id_InputCantidadPagoMod').val());
        console.log('oferta registrar multiplicidad JSON: ', Oferta)
        $.ajax({
            type: 'post',
            url: 'Catalogo/ActualizarOfertaMulti',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(Oferta),
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (data.result == "success") {
                    //Escondiendo el Modal
                    $("#registrarProductoOferta").modal('hide');
                    //Limpiando los Campos de Texto
                    clearDataCompra();
                    //Recargar Tabla
                    //$('.datatable-compra').dataTable().fnDraw();
                    //Mostrando el Mensaje de Exito
                    Swal.fire({
                        title: '<strong>Listo!</strong>',
                        icon: 'success',
                        html:
                            'Oferta Actualizada Satisfactoriamente',
                        showCloseButton: true,
                        showCancelButton: false,
                        focusConfirm: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText:
                            'Continuar',
                        confirmButtonAriaLabel: 'Continuar',
                    });
                }
                else {
                    Swal.fire({
                        title: '<strong>Error!</strong>',
                        icon: 'error',
                        html:
                            'Lo sentimos, Ocurrió un error Inesperado - MOD00',
                        showCloseButton: true,
                        showCancelButton: false,
                        focusConfirm: false,
                        confirmButtonColor: '#d33',
                        confirmButtonText:
                            'Volver',
                        confirmButtonAriaLabel: 'Volver',
                    });
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                Swal.fire({
                    title: '<strong>Error!</strong>',
                    icon: 'error',
                    html:
                        'Error del Servidor - Status 300 MOD',
                    showCloseButton: true,
                    showCancelButton: false,
                    focusConfirm: false,
                    confirmButtonColor: '#d33',
                    confirmButtonText:
                        'Volver',
                    confirmButtonAriaLabel: 'Volver',
                });
            }
        });
    }
});
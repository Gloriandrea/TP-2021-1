var itemsProductos = [];
var costoTotal = 0.00;
var costoProductoRegistrar = 0.00;
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
                {
                    "render": function (data, type, full, meta) {
                        var badge = '';
                        switch (full.estado) {
                            case 'pendiente':
                                badge = 'bg-warning';
                                break;
                            case 'anulada':
                                badge = 'bg-danger';
                                break;
                            case 'cobrado':
                                badge = 'bg-success';
                                break;
                            case 'entregado':
                                badge = 'bg-info';
                                break;
                            case 'delivery':
                                badge = 'bg-primary';
                                break;
                            case 'repartido':
                                badge = 'bg-secondary';
                                break;
                        }
                        return '<span style="color: white" class="badge ' + badge + ' ">' + full.estado.charAt(0).toUpperCase() + full.estado.slice(1) + '</span>'
                    }
                },
                {
                    "render": function (data, type, full, meta) {
                        var display = (full.estado === "entregado") ? "display:none" : "";
                        var displayco = (full.estado === "cobrado" || full.estado === "entregado" || full.estado === "delivery" || full.estado ==="repartido") ? "display:none" : "";
                        var color = '';
                        var icon = '';
                        switch (full.estado) {
                            case 'pendiente':
                                icon = 'fas fa-ban';
                                color = 'red';
                                break;
                            case 'anulada':
                                icon = 'fas fa-check';
                                color = '#19F15D';
                                break;
                            case 'cobrado':
                                icon = 'fas fa-shopping-basket';
                                color = '#2374E3';
                                break;
                            case 'delivery':
                                icon = 'fas fa-truck';
                                color = '#E4860F';
                                break;
                            case 'repartido':
                                icon = 'fas fa-shopping-basket';
                                color = '#2374E3';
                                break;
                        }
                        return '<button class="btn btnVisualizarVenta" style="color: #4AB6B6" data-venta-id="' + full.id + '"><img class="fas fa-eye" /></button>' +
                            '<button class="btn btnModificarVenta" style="color: #4AB6B6;' + displayco + '" data-venta-id="' + full.id + '"><img class="fas fa-edit" /></button>' +
                            '<button class="btn btnCambiarEstadoVenta" style="color:' + color + '; ' + display + '" data-venta-id="' + full.id + '"><img class="' + icon + '" /></button>';
                    }
                }
            ]
        }
    );
});

//-----------------LECTOR QR-----------------------
function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete"
        || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

docReady(function () {
    var resultContainer = document.getElementById('qr-reader-results');
    var lastResult, countResults = 0;
    function onScanSuccess(decodedText, decodedResult) {
        if (decodedText !== lastResult) {
            ++countResults;
            lastResult = decodedText;
            var productoID = decodedText;
            $.ajax({
                url: $('#URL_ObtenerProductoPorID').val(),
                type: 'post',
                data: "productoID=" + decodedText,
                dataType: "json",
                success: function (data) {
                    if (data.result) {
                        var producto = data.value.producto;
                        $("#productoVentaRegistrar").val(decodedText);
                        $("#cantidadVentaRegistrar").val(1);
                        $("#costoVentaRegistrar").val(producto.precio);
                        console.log(producto);
                    } else {
                        console.log('ERROR al consultar el Usuario');
                    }
                }
            });


        }
    }

    var html5QrcodeScanner = new Html5QrcodeScanner(
        "qr-reader", { fps: 10, qrbox: 250 });
    html5QrcodeScanner.render(onScanSuccess);
});

//------------------------------------------------------------------



function cambiarDNIusuario() {
    var idUsuario = $('#usuarioVentaRegistrar').val();
    $.ajax({
        url: $('#URL_ObtenerUsuario').val(),
        type: 'post',
        data: "usuarioID=" + idUsuario,
        dataType: "json",
        success: function (data) {
            if (data.result) {
                var usuario = data.value;
                $('#dniUsuario').val(usuario.datos.numeroDocumento);
            } else {
                console.log('ERROR al consultar el Usuario');
            }
        }
    });
}

$("#itemVenta").on("click", ".btnBorrar", function (event) {
    $(this).closest("tr").remove();
    var costoBorrar = parseFloat($(this).closest("tr")[0].cells[2].textContent);
    costoTotal -= costoBorrar;
    $('#itemRegistrarTotal').text(parseFloat(costoTotal).toFixed(2));
});

$("#itemVentaModificar").on("click", ".btnBorrar", function (event) {
    $(this).closest("tr").remove();
    var costoBorrar = parseFloat($(this).closest("tr")[0].cells[2].textContent);
    costoTotal -= costoBorrar;
    $('#itemModificarTotal').text(parseFloat(costoTotal).toFixed(2));
});

function clearDataVenta() {
    $('#presencialRadio').prop('checked', false);
    $('#onlineRadio').prop('checked', false);
    $('#nombreCliente').val('');
    $('#apellidoCliente').val('');
    $('#correoCliente').val('');
    $('#telefonoCliente').val('');
    $('#direccionCliente').val('');
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

function cambioProductoModificar() {
    var productoid = $('#productoVentaModificar').val();
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
                $('#cantidadVentaModificar').val('1');
                var cantidad = $('#cantidadVentaModificar').val();
                var subtotal = parseFloat(costo * cantidad).toFixed(2);
                $('#costoVentaModificar').val(subtotal);
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

    $('#productoVentaRegistrar').val('');
    $('#cantidadVentaRegistrar').val('');
    $('#costoVentaRegistrar').val('0.00');
    costoProductoRegistrar = 0.00;
};

function validarAddItem() {
    var msj = '';
    if ($('#productoVentaRegistrar').val() == null) {
        msj += '*Seleccione un producto para agregar a la venta. <br>'
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

function cambioCantidadModificar() {
    var cantidad = $('#cantidadVentaModificar').val();
    var subtotal = parseFloat(cantidad * costoProductoRegistrar).toFixed(2);
    $('#costoVentaModificar').val(subtotal);
}

function validarVacioVentaRegistrar() {
    var msj = '';
    if ($('#nombreCliente').val().length <= 0) {
        msj += '*Debe ingresar un nombre del Cliente. <br>'
    }
    if ($('#apellidoCliente').val().length <= 0) {
        msj += '*Debe ingresar los apellidos del Cliente. <br>'
    }
    if ($('#correoCliente').val().length <= 0) {
        msj += '*Debe ingresar un correo del Cliente. <br>'
    }
    if ($('#telefonoCliente').val().length <= 0) {
        msj += '*Debe ingresar un telefono del Cliente. <br>'
    }
    if ($('#direccionCliente').val().length <= 0) {
        msj += '*Debe ingresar la dirección del Cliente. <br>'
    }
    if ($('#presencialRadio').is(':checked') == false && $('#onlineRadio').is(':checked') == false) {
        msj += '*Debe seleccionar un tipo de Venta. <br>'
    }
    if (document.getElementById('itemVenta').rows.length == 1) {
        msj += '*Debe haber al menos una venta de producto para generar el registro'
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

$("#btnRegistrarVentaModal").on("click", function () {
    if (validarVacioVentaRegistrar() == false) {
        return false;
    }
    var Venta = new Object();
    var datos = new Object();
    if ($('#presencialRadio').is(':checked')) {
        Venta.tipo = "presencial";
    }
    if ($('#onlineRadio').is(':checked')) {
        Venta.tipo = "online";
    }
    datos.nombres = $('#nombreCliente').val();
    datos.apellidos = $('#apellidoCliente').val();
    datos.correo = $('#correoCliente').val();
    datos.telefono = $('#telefonoCliente').val();
    datos.direccion = $('#direccionCliente').val();
    Venta.total = costoTotal;
    Venta.datos = datos;
    var row = document.getElementById('itemVenta').rows.length;
    for (i = 1; i < row; i++) {
        var item = new Object();
        item.nombre = document.getElementById("itemVenta").rows[i].cells.item(0).innerHTML;
        item.cantidad = Number(document.getElementById("itemVenta").rows[i].cells.item(1).innerHTML);
        item.subTotal = parseFloat(document.getElementById("itemVenta").rows[i].cells.item(2).innerHTML);
        itemsProductos.push(item);
    }

    Venta.items = itemsProductos;
    Venta.estado = "pendiente";
    $.ajax({
        type: 'post',
        url: 'Venta/RegistrarVenta',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(Venta),
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            if (data.result == "success") {
                //Escondiendo el Modal
                $("#modalRegistrarVenta").modal('hide');
                //Limpiando los Campos de Texto
                clearDataVenta();
                //Recargar Tabla
                $('.datatable-venta').dataTable().fnDraw();
                //Mostrando el Mensaje de Exito
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
});

function clearDataVentaModificar() {
    $('#productoVentaModificar').val('');
    $('#cantidadVentaModificar').val('');
    $('#costoVentaModificar').val('0.00');
    $('#itemVentaModificar tbody').empty();
    itemsProductos = [];
}

$('#tableVenta').on('click', '.btnModificarVenta', function (e) {
    clearDataVentaModificar();
    costoTotal = 0.00;
    e.preventDefault();
    var ventaID = $(this).attr('data-venta-id');
    $.ajax({
        url: $("#URL_ObtenerVentaPorID").val(),
        type: 'post',
        data: "idventa=" + ventaID,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            if (data.result == "success") {
                var venta = data.value.venta;
                var itemsventas = venta.items;
                $("#idVentaModificar").val(venta.id)
                if (venta.tipo == "presencial") {
                    $('#presencialRadioModificar').prop('checked', true);
                }
                if (venta.tipo == "online") {
                    $('#onlineRadioModificar').prop('checked', true);
                }
                itemsventas.forEach(v => {
                    var row = "<tr>" +
                        "<td>" + v.nombre + "</td>" +
                        "<td>" + v.cantidad + "</td>" +
                        "<td>" + parseFloat(v.subTotal).toFixed(2) + "</td>" +
                        '<td><input type="button" class="btnBorrar btn btn-danger" value="Eliminar"></td>' +
                        "</tr>";
                    $('#itemVentaModificar > tbody').append(row);
                    costoTotal += v.subTotal;
                });
                $('#itemModificarTotal').text(parseFloat(costoTotal).toFixed(2));
                $("#modalModificarVenta").modal('show');
            }
            else {
                console.log("ERROR AL OBTENER LOS DATOS");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("ERROR AL OBTENER LOS DATOS");
        }
    });
});

$('#tableVenta').on('click', '.btnVisualizarVenta', function (e) {
    $('#itemVentaConsultar tbody').empty();
    e.preventDefault();
    var ventaID = $(this).attr('data-venta-id');
    $.ajax({
        url: $("#URL_ObtenerVentaPorID").val(),
        type: 'post',
        data: "idventa=" + ventaID,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            if (data.result == "success") {
                var venta = data.value.venta;
                var datos = venta.datos;
                if (venta.tipo == "presencial") {
                    $('#presencialRadioConsultar').prop('checked', true);
                }
                if (venta.tipo == "online") {
                    $('#onlineRadioConsultar').prop('checked', true);
                }
                $('#nombreClienteConsultar').val(datos.nombres);
                $('#apellidoClienteConsultar').val(datos.apellidos);
                $('#correoClienteConsultar').val(datos.correo);
                $('#telefonoClienteConsultar').val(datos.telefono);
                $('#direccionClienteConsultar').val(datos.direccion);
                var itemscompra = venta.items;
                var costoTotalConsulta = 0.0;
                $("#idVentaConsultar").val(venta.id);
                itemscompra.forEach(v => {
                    var row = "<tr>" +
                        "<td>" + v.nombre + "</td>" +
                        "<td>" + v.cantidad + "</td>" +
                        "<td>" + parseFloat(v.subTotal).toFixed(2) + "</td>" +
                        "</tr>";
                    $('#itemVentaConsultar > tbody').append(row);
                    costoTotalConsulta += v.subTotal;
                });
                $('#itemConsultarTotal').text(parseFloat(costoTotalConsulta).toFixed(2));
                $("#modalConsultarVenta").modal('show');
            }
            else {
                console.log("ERROR AL OBTENER LOS DATOS");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("ERROR AL OBTENER LOS DATOS");
        }
    });
});

$('#tableVenta').on('click', '.btnCambiarEstadoVenta', function (e) {
    var ventaID = $(this).attr('data-venta-id');
    $.ajax({
        url: $("#URL_ObtenerVentaPorID").val(),
        type: 'post',
        data: "idventa=" + ventaID,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            if (data.result == "success") {
                var venta = data.value.venta;
                var estado = venta.estado;
                var texto = '';
                var botonCon = '';
                switch (estado) {
                    case "pendiente":
                        texto = "Desea anular la venta seleccionada";
                        botonCon = "Anular";
                        break;
                    case "anulada":
                        texto = "Desea activar la venta seleccionada";
                        botonCon = "Activar";
                        break;
                    case "cobrado":
                        texto = "La venta seleccionada ha sido entregada?"
                        botonCon = "Sí";
                        break;
                    case "delivery":
                        texto = "Desea repartir la venta seleccionada"
                        botonCon = "Sí";
                        break;
                    case "repartido":
                        texto = "La venta seleccionada ha sido entregada?"
                        botonCon = "Sí";
                        break;
                };
                Swal.fire({
                    title: 'Modificacion de Estado',
                    text: texto,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: botonCon,
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        var textoFinal = '';
                        switch (estado) {
                            case "pendiente":
                                textoFinal = "La venta se ha anulado satisfactoriamente";
                                break;
                            case "anulada":
                                textoFinal = "La venta se ha activado satisfactoriamente";
                                break;
                            case "cobrado":
                                textoFinal = "La venta se ha entregado satisfactoriamente";
                                break;
                            case "delivery":
                                textoFinal = "La venta ha sido repartido";
                                break;
                            case "repartido":
                                textoFinal = "La venta se ha entregado satisfactoriamente";
                                break;
                        };
                        $.ajax({
                            url: $("#URL_VentaActualizarEstado").val(),
                            type: 'post',
                            data: "ventaid=" + ventaID + "&estadoActual=" + estado,
                            dataType: "json",
                            success: function (data, textStatus, jqXHR) {
                                if (data.result == "success") {
                                    //Recargar Tabla
                                    $('.datatable-venta').dataTable().fnDraw();
                                    //Mostrar Mensaje Final
                                    Swal.fire(
                                        'Modificado!',
                                        textoFinal,
                                        'success'
                                    );
                                }
                                else {
                                    Swal.fire(
                                        'Error!',
                                        'Ocurrio un error inesperado',
                                        'error'
                                    );
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                console.log("ERROR AL OBTENER LOS DATOS");
                            }
                        });
                    }
                });
            }
            else {
                console.log("ERROR AL OBTENER LOS DATOS");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("ERROR AL OBTENER LOS DATOS");
        }
    });
});

function validarVacioVentaModificar() {
    var msj = '';
    if ($('#presencialRadioModificar').is(':checked') == false && $('#onlineRadioModificar').is(':checked') == false) {
        msj += '*Debe seleccionar un tipo de Venta. <br>'
    }
    if (document.getElementById('itemVentaModificar').rows.length == 1) {
        msj += '*Debe haber al menos una venta de producto para generar la actualización'
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

$("#btnModificarVentaModal").on("click", function () {
    if (validarVacioVentaModificar() == false) {
        return false;
    };
    var Venta = new Object();

    Venta.id = $('#idVentaModificar').val();
    if ($('#presencialRadioModificar').is(':checked')) {
        Venta.tipo = "presencial";
    }
    if ($('#onlineRadioModificar').is(':checked')) {
        Venta.tipo = "online";
    }
    Venta.total = costoTotal;

    var row = document.getElementById('itemVentaModificar').rows.length;
    for (i = 1; i < row; i++) {
        var item = new Object();
        item.nombre = document.getElementById("itemVentaModificar").rows[i].cells.item(0).innerHTML;
        item.cantidad = Number(document.getElementById("itemVentaModificar").rows[i].cells.item(1).innerHTML);
        item.subTotal = parseFloat(document.getElementById("itemVentaModificar").rows[i].cells.item(2).innerHTML);
        itemsProductos.push(item);
    }

    Venta.items = itemsProductos;

    $.ajax({
        url: 'Venta/ActualizarVenta',
        type: 'post',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(Venta),
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            if (data.result == "success") {
                //Escondiendo el Modal
                $("#modalModificarVenta").modal('hide');
                //Limpiando los Campos de Texto
                clearDataVentaModificar();
                //Recargar Tabla
                $('.datatable-venta').dataTable().fnDraw();
                //Mostrando el Mensaje de Exito
                Swal.fire({
                    title: '<strong>Listo!</strong>',
                    icon: 'success',
                    html:
                        'Venta Actualizado Satisfactoriamente',
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

});

function validarAddItemModificar() {
    var msj = '';
    if ($('#productoVentaModificar').val() == null) {
        msj += '*Seleccione un producto para agregar a la venta. <br>'
    }
    if ($('#cantidadVentaModificar').val() == "") {
        msj += '*Ingresar una cantidad. <br>'
    }
    if ($('#costoVentaModificar').val() == "") {
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

function addItemModificar() {
    if (validarAddItemModificar() == false) {
        return false;
    }
    var nombre = $('#productoVentaModificar option:selected').text();
    var cantidad = $('#cantidadVentaModificar').val();
    var costo = $('#costoVentaModificar').val();
    var row = "<tr>" +
        "<td>" + nombre + "</td>" +
        "<td>" + cantidad + "</td>" +
        "<td>" + parseFloat(costo).toFixed(2) + "</td>" +
        '<td><input type="button" class="btnBorrar btn btn-danger" value="Eliminar"></td>' +
        "</tr>";
    $('#itemVentaModificar > tbody').append(row);

    costoTotal += parseFloat(costo);
    $('#itemModificarTotal').text(parseFloat(costoTotal).toFixed(2));
    $('#productoVentaModificar').val('');
    $('#cantidadVentaModificar').val('');
    $('#costoVentaModificar').val('0.00');
    costoProductoRegistrar = 0.00;
};
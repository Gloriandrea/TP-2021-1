//para imprimir la venta
//    function imprim1(imp1) {
//        var printContents = document.getElementById('imp1').innerHTML;
//        w = window.open();
//        w.document.write(printContents);
//        w.document.close(); // necessary for IE >= 10
//        w.focus(); // necessary for IE >= 10
//        w.print();
//        w.close();
//        return true;
//}
//Tabla principal CUS Gestionar Pago
$(document).ready(function () {
    
    $('.datatable-ventas').DataTable(
        {
            dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
            
            "processing": true,
            "serverSide": true,
            "searching": false,
            "sort": true,
            "lengthChange": false,
            "autoWidth": false,

            "ajax": {
                "url": $('#URL_VentaListar').val(),
                "type": "POST",
                "error": function () {
                    document.location.reload();
                }
            },
            "oLanguage": {
                "sProcessing": "",
                "sInfoFiltered": "",
                "sZeroRecords": "No se encontro registros",
                "sInfoEmpty": "No hay registros para mostrar",
                "lengthMenu": "Mostrar _MENU_ registros",
                "zeroRecords": "No se encontraron resultados",
                "emptyTable": "Ningún dato disponible en esta tabla",
                "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                "infoFiltered": "(filtrado de un total de _MAX_ registros)",
                "search": "Buscar:",
                "infoThousands": ",",
                "loadingRecords": "Cargando...",
                "oPaginate": {
                    "first": "Primero",
                    "last": "Último",
                    "next": "Siguiente",
                    "previous": "Anterior"
                },
                "aria": {
                    "sortAscending": ": Activar para ordenar la columna de manera ascendente",
                    "sortDescending": ": Activar para ordenar la columna de manera descendente"
                },
                "buttons": {
                    "copy": "Copiar",
                    "colvis": "Visibilidad",
                    "collection": "Colección",
                    "colvisRestore": "Restaurar visibilidad",
                    "copyKeys": "Presione ctrl o u2318 + C para copiar los datos de la tabla al portapapeles del sistema. <br \/> <br \/> Para cancelar, haga clic en este mensaje o presione escape.",
                    "copySuccess": {
                        "1": "Copiada 1 fila al portapapeles",
                        "_": "Copiadas %d fila al portapapeles"
                    },
                    "copyTitle": "Copiar al portapapeles",
                    "csv": "CSV",
                    "excel": "Excel",
                    "pageLength": {
                        "-1": "Mostrar todas las filas",
                        "1": "Mostrar 1 fila",
                        "_": "Mostrar %d filas"
                    },
                    "pdf": "PDF",
                    "print": "Imprimir"
                },
                "autoFill": {
                    "cancel": "Cancelar",
                    "fill": "Rellene todas las celdas con <i>%d<\/i>",
                    "fillHorizontal": "Rellenar celdas horizontalmente",
                    "fillVertical": "Rellenar celdas verticalmentemente"
                },
                "decimal": ",",
                "searchBuilder": {
                    "add": "Añadir condición",
                    "button": {
                        "0": "Constructor de búsqueda",
                        "_": "Constructor de búsqueda (%d)"
                    },
                    "clearAll": "Borrar todo",
                    "condition": "Condición",
                    "conditions": {
                        "date": {
                            "after": "Despues",
                            "before": "Antes",
                            "between": "Entre",
                            "empty": "Vacío",
                            "equals": "Igual a",
                            "notBetween": "No entre",
                            "notEmpty": "No Vacio",
                            "not": "Diferente de"
                        },
                        "number": {
                            "between": "Entre",
                            "empty": "Vacio",
                            "equals": "Igual a",
                            "gt": "Mayor a",
                            "gte": "Mayor o igual a",
                            "lt": "Menor que",
                            "lte": "Menor o igual que",
                            "notBetween": "No entre",
                            "notEmpty": "No vacío",
                            "not": "Diferente de"
                        },
                        "string": {
                            "contains": "Contiene",
                            "empty": "Vacío",
                            "endsWith": "Termina en",
                            "equals": "Igual a",
                            "notEmpty": "No Vacio",
                            "startsWith": "Empieza con",
                            "not": "Diferente de"
                        },
                        "array": {
                            "not": "Diferente de",
                            "equals": "Igual",
                            "empty": "Vacío",
                            "contains": "Contiene",
                            "notEmpty": "No Vacío",
                            "without": "Sin"
                        }
                    },
                    "data": "Data",
                    "deleteTitle": "Eliminar regla de filtrado",
                    "leftTitle": "Criterios anulados",
                    "logicAnd": "Y",
                    "logicOr": "O",
                    "rightTitle": "Criterios de sangría",
                    "title": {
                        "0": "Constructor de búsqueda",
                        "_": "Constructor de búsqueda (%d)"
                    },
                    "value": "Valor"
                },
                "searchPanes": {
                    "clearMessage": "Borrar todo",
                    "collapse": {
                        "0": "Paneles de búsqueda",
                        "_": "Paneles de búsqueda (%d)"
                    },
                    "count": "{total}",
                    "countFiltered": "{shown} ({total})",
                    "emptyPanes": "Sin paneles de búsqueda",
                    "loadMessage": "Cargando paneles de búsqueda",
                    "title": "Filtros Activos - %d"
                },
                "select": {
                    "1": "%d fila seleccionada",
                    "_": "%d filas seleccionadas",
                    "cells": {
                        "1": "1 celda seleccionada",
                        "_": "$d celdas seleccionadas"
                    },
                    "columns": {
                        "1": "1 columna seleccionada",
                        "_": "%d columnas seleccionadas"
                    }
                },
                "thousands": ".",
                "datetime": {
                    "previous": "Anterior",
                    "next": "Proximo",
                    "hours": "Horas",
                    "minutes": "Minutos",
                    "seconds": "Segundos",
                    "unknown": "-",
                    "amPm": [
                        "am",
                        "pm"
                    ]
                },
                "editor": {
                    "close": "Cerrar",
                    "create": {
                        "button": "Nuevo",
                        "title": "Crear Nuevo Registro",
                        "submit": "Crear"
                    },
                    "edit": {
                        "button": "Editar",
                        "title": "Editar Registro",
                        "submit": "Actualizar"
                    },
                    "remove": {
                        "button": "Eliminar",
                        "title": "Eliminar Registro",
                        "submit": "Eliminar",
                        "confirm": {
                            "_": "¿Está seguro que desea eliminar %d filas?",
                            "1": "¿Está seguro que desea eliminar 1 fila?"
                        }
                    },
                    "error": {
                        "system": "Ha ocurrido un error en el sistema (<a target=\"\\\" rel=\"\\ nofollow\" href=\"\\\">Más información&lt;\\\/a&gt;).<\/a>"
                    },
                    "multi": {
                        "title": "Múltiples Valores",
                        "info": "Los elementos seleccionados contienen diferentes valores para este registro. Para editar y establecer todos los elementos de este registro con el mismo valor, hacer click o tap aquí, de lo contrario conservarán sus valores individuales.",
                        "restore": "Deshacer Cambios",
                        "noMulti": "Este registro puede ser editado individualmente, pero no como parte de un grupo."
                    }
                },
                "info": "Mostrando de _START_ a _END_ de _TOTAL_ entradas"
            },
            "serverParams": function (setting) {
            },
            "columns": [
                { "data": "codigoVenta" },
                { "render": function (data, type, full, meta) { return 'S/. ' + parseFloat(full.total).toFixed(2) } },
                {
                    "render": function (data, type, full, meta) {
                        var date = new Date(Date.parse(full.fechaVenta));
                        return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
                    }
                },
                { "data": "estado" },                 
                //{ "render": function (data, type, full, meta) { return full.codigoVenta } },
                //{ "render": function (data, type, full, meta) { return full.total } },
                //{ "render": function (data, type, full, meta) { return full.estado } },
                //{ "render": function (data, type, full, meta) { return full.fecha } },
                {
                    "render": function (data, type, full, meta) {
                        return '<button class="btn btnRegistrarPago" style="color:#4AB6B6" data-venta-id="' + full.id + '"><img class="fas fa-edit" />Cobrar</button>';

                    }
                }
            ]
        }
    );
});

//carga del modal ver venta para CUS gestionar Pago
$('#tablaVentaPorCódigo').on('click', '.btnRegistrarPago', function (e) {
        e.preventDefault();
        console.log("en btn RegistrarPago")
        var codVenta = $(this).attr('data-venta-id');
        console.log('codigoVenta en registrarPago', codVenta)
        $.ajax({
            url: $("#URL_ObtenerVentaPorCodigoVenta").val(),
            type: 'post',
            data: "codigoVenta=" + codVenta,
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (data.result == "success") {
                    console.log("entro data result")
                    var venta = data.value;
                    console.log('codigoVenta', venta.codigoVenta)
                    console.log('codigoVenta', venta.id)
                    $("#idCodigoVenta").val(venta.id)
                    $("#txtCodVenta").val(venta.codigoVenta);
                    var date = new Date(Date.parse(venta.fechaVenta));
                    $("#txtFecha").val(date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());
                    var productos = '';
                    venta.items.forEach(c => {
                        productos += c.nombre + "\n";
                    });
                    $("#txaProductos").val(productos);     
                    $("#txtTotal").val(venta.total);
                    $("#txtEfectivo").keyup(function () {
                        var value = $(this).val();
                        if (value > 0) {
                            $("#txtVuelto").val(parseInt(value) - parseInt(venta.total));
                        }
                        else {
                            $("#txtVuelto").val("0");
                        }

                    });
                    $("#modalPagoVenta").modal('show');
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


// Pago de una venta
$(function () {
    $('#modalPagoVenta').on('click', '.btn-pagar', function (e) {
        console.log("Ingresando a Pago");
        var id = $("#idCodigoVenta").val();
        console.log("codigoVenta", id);
        $.ajax({
            url: $("#URL_ObtenerVentaPorCodigoVenta").val(),
            type: 'post',
            data: "codigoVenta=" + id,
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (data.result == "success") {
                    var venta = data.value;
                    var estado = venta.estado;
                    console.log("estado: ", estado);
                    var total = venta.total;
                    console.log("total: ", total);
                    var efectivo = $("#txtEfectivo").val();
                    var ID = venta.id;
                    console.log("efectivo: ", efectivo);                

                    if (total <= efectivo) {
                        $("#txtVuelto").val(efectivo - total);                 

                    if (estado=="pendiente") {
                                var textoFinal = "pagada";
                                $.ajax({
                                    url: $("#URL_CambiarEstadoVenta").val(),
                                    type: 'post',
                                    data: "codigoVenta=" + ID + "&estadoActual=" + estado,
                                    dataType: "json",
                                    success: function (data, textStatus, jqXHR) {
                                        if (data.result == "success") {
                                            console.log("estado: ", estado);
                                           
                                            Swal.fire(
                                                'Modificado!',
                                                'Venta ' + textoFinal + ' Satisfactoriamente',
                                                'success'
                                            );
                                           
                                            location.reload()    
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
                    else {
                        $('#modalPagoVenta').modal('hide');
                        Swal.fire(
                            "La venta ha sido anteriormente "+ estado
                        );
                        console.log("La venta ha sido anteriormente PAGADA");
                    }

                    }
                    else {
                        Swal.fire(
                            "Ingrese una cantidad correcta"
                        );
                    }
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
});

//anular Pago
$(function () {
    $('#modalPagoVenta').on('click', '.btn-anular', function (e) {
        console.log("Ingresando a anular venta: ");
        var id = $("#idCodigoVenta").val();
        console.log("codigoVenta: ", id);
        
        $.ajax({
            url: $("#URL_ObtenerVentaPorCodigoVenta").val(),
            type: 'post',
            data: "codigoVenta=" + id,
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (data.result == "success") {
                    var venta = data.value;
                    var ID = venta.id;
                    var estado = venta.estado;
                    console.log("estado: ", estado);

                    if (estado != "anulada" && estado != "pendiente" && estado != "entregado" ) {
                        var textoFinal = "anulada";
                        $.ajax({
                            url: $("#URL_CambiarEstadoVenta").val(),
                            type: 'post',
                            data: "codigoVenta=" + ID + "&estadoActual=" + estado,
                            dataType: "json",
                            success: function (data, textStatus, jqXHR) {
                                if (data.result == "success") {
                                    console.log("estado: ", estado);

                                    //Recargar Tabla
                                    $('.datatable-venta').dataTable().fnDraw();
                                    location.reload()
                                    //Mostrar Mensaje Final
                                    $('#modalPagoVenta').modal('hide');
                                    Swal.fire(
                                        'Modificado!',
                                        'Venta ' + textoFinal + ' Satisfactoriamente',
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
                    else {
                        $('#modalPagoVenta').modal('hide');
                        if (estado == "anulada") {
                            Swal.fire(
                                "La venta ha sido anteriormente anulada"
                            );
                        }
                        else {
                            Swal.fire(
                                "El estado de la venta es: " + estado
                            );
                        }
                       
                        console.log("La venta ha sido anteriormente ANULADA");
                    }
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
});

//limpiar input buscar
$("#btnLimpiar").on('click', function () {
    $("#searchTerm").val(""); document.location.reload();
});

//Buscar una venta
function doSearch() {
    const tableReg = document.getElementById('tablaVentaPorCódigo');
    const searchText = document.getElementById('searchTerm').value.toLowerCase();
    let total = 0;

    // Recorremos todas las filas con contenido de la tabla
    for (let i = 1; i < tableReg.rows.length; i++) {
        // Si el td tiene la clase "noSearch" no se busca en su cntenido
        if (tableReg.rows[i].classList.contains("noSearch")) {
            continue;
        }

        let found = false;
        const cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
        // Recorremos todas las celdas
        for (let j = 0; j < cellsOfRow.length && !found; j++) {
            const compareWith = cellsOfRow[j].innerHTML.toLowerCase();
            // Buscamos el texto en el contenido de la celda
            if (searchText.length == 0 || compareWith.indexOf(searchText) > -1) {
                found = true;
                total++;
            }
        }
        if (found) {
            tableReg.rows[i].style.display = '';
        } else {
            // si no ha encontrado ninguna coincidencia, esconde la
            // fila de la tabla
            tableReg.rows[i].style.display = 'none';
        }
    }
    // mostramos las coincidencias
    const lastTR = tableReg.rows[tableReg.rows.length - 1];
    const td = lastTR.querySelector("td");
    lastTR.classList.remove("hide", "red");
    if (searchText == "") {
        document.location.reload();
        lastTR.classList.add("hide");
    } else if (total) {
        
    } else {
        lastTR.classList.add("red");
        Swal.fire("No se han encontrado coincidencias");
    }
}


//$(document).ready(function () {
//    $('.datatable-pago').DataTable(
//        {
//            dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
//            "processing": true,
//            "serverSide": true,
//            "searching": true,
//            "sort": true,
//            "lengthChange": false,
//            "autoWidth": false,
//            "ajax": {
//                "url": $('#URL_VentaListar').val(),
//                "type": "POST",
//                "error": function () {
//                    document.location.reload();
//                }
//            },
//            "oLanguage": {
//                "oPaginate": {
//                    "sFirst": "Primero",
//                    "sNext": "Siguiente",
//                    "sPrevious": "Anterior",
//                    "sLast": "Ultimo"
//                },
//                "sInfo": "_START_ a _END_ de _TOTAL_ registros",
//                "sLengthMenu": "Mostrar _MENU_ registros",
//                "sSearch": "Buscar:",
//                "sProcessing": "",
//                "sInfoFiltered": "",
//                "sInfoFiltered": '',
//                "sZeroRecords": "No se encontro registros",
//                "sInfoEmpty": "No hay registros para mostrar"
//            },
//            "serverParams": function (setting) {
//            },
//            "columns": [
//                { "data": "nombreEmpresa" },
//                { "data": "ruc" },
//                { "data": "correoEmpresa" },
//                { "render": function (data, type, full, meta) { return full.codigoVenta + ' ' + full.total; } },
//                { "render": function (data, type, full, meta) { return '<span style="color: white" class="badge ' + (full.estado == "activo" ? 'bg-success' : 'bg-danger') + ' ">' + full.estado.charAt(0).toUpperCase() + full.estado.slice(1) + '</span>' } },
//                {
//                    "render": function (data, type, full, meta) {
//                        return '<button class="btn btnVisualizarProveedor" style="color: #4AB6B6" data-proveedor-id="' + full.id + '"><img class="fas fa-eye" /></button>' +
//                            '<button class="btn btnModificarProveedor" style="color: #4AB6B6" data-proveedor-id="' + full.id + '"><img class="fas fa-edit" /></button>' +
//                            '<button class="btn btnCambiarEstadoProveedor" style="color: red" data-proveedor-id="' + full.id + '"><img class="fas fa-ban" /></button>';;
//                    }
//                }
//            ]
//        });


//});








$(function () {
    $("#btnPrint").on("click", function imprim(imp1) {
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


$(function () {
    $("#btnBuscarVenta").on("click", function () {
        $.ajax({
            url: $("#URL_ObtenerVentaPorCodigoVenta").val(),
            type: 'post',
            data: "codigoVenta=" + $("#codigoVenta").val(),
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (data.result == "success") {
                    console.log(data);
                    //document.getElementById("tablaVentaPorCódigo").innerHTML = "";
                    document.getElementById("tablaVentaPorCódigo").innerHTML= data.printContents;
               
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


$(function () {
    $(document).ready(function () {
        $('#tablaVentaPorCódigo').DataTable({
            "language": {
                "processing": "Procesando...",
                "lengthMenu": "Mostrar _MENU_ registros",
                "zeroRecords": "No se encontraron resultados",
                "emptyTable": "Ningún dato disponible en esta tabla",
                "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                "infoFiltered": "(filtrado de un total de _MAX_ registros)",
                "search": "Buscar:",
                "infoThousands": ",",
                "loadingRecords": "Cargando...",
                "paginate": {
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
            }
        });
    });
});
     


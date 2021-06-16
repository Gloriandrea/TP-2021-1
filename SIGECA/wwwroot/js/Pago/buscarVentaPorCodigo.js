const { getElements } = require("dropzone");

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
                    document.getElementById("tablaVentaPorCódigo").innerHTML = "";
                    //document.getElementById("tablaVentaPorCódigo").innerHTML = getElements(data);
                    //document.getElementById("tablaVentaPorCódigo").innerHTML = "hola";
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
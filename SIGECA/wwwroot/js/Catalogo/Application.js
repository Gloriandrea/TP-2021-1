$(document).ready(function () {
    $("#btnAddProduct").click(function () {
        $("#div_Porcentaje").fadeOut();
        $("#div_Multiplicidad").fadeOut();
        console.log("en btn add")
    })

    //ocultando mostrando content
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
});
function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
        textbox.addEventListener(event, function () {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    });
}
setInputFilter(document.getElementById("id_InputCantidadPagoRegistrar"), function (value) {
    return /^\d*$/.test(value);
});
setInputFilter(document.getElementById("id_InputPorcentajeRegistrar"), function (value) {
    return /^\d*$/.test(value);
});
setInputFilter(document.getElementById("id_InputMultiplicidadRegistrar"), function (value) {
    return /^\d*$/.test(value);
});
setInputFilter(document.getElementById("fechaIniRegistrar"), function (value) {
    return /^\d*$/.test(value);
});
setInputFilter(document.getElementById("fechaVenciRegistrar"), function (value) {
    return /^\d*$/.test(value);
});
setInputFilter(document.getElementById("precioOfertaRegistrar"), function (value) {
    return /^\d*$/.test(value);
});
setInputFilter(document.getElementById("stockOfertaModificar"), function (value) {
    return /^\d*$/.test(value);
});
setInputFilter(document.getElementById("precioOfertaConsultar"), function (value) {
    return /^\d*$/.test(value);
});
setInputFilter(document.getElementById("id_InputPorcentaje"), function (value) {
    return /^\d*$/.test(value);
});
setInputFilter(document.getElementById("id_InputMultiplicidad"), function (value) {
    return /^\d*$/.test(value);
});
setInputFilter(document.getElementById("id_InputCantidadPago"), function (value) {
    return /^\d*$/.test(value);
});
setInputFilter(document.getElementById("id_InputPorcentajeMod"), function (value) {
    return /^\d*$/.test(value);
});
setInputFilter(document.getElementById("id_InputMultiplicidadMod"), function (value) {
    return /^\d*$/.test(value);
});
setInputFilter(document.getElementById("id_InputCantidadPagoMod"), function (value) {
    return /^\d*$/.test(value);
});
setInputFilter(document.getElementById("stockOfertaModificar"), function (value) {
    return /^\d*$/.test(value);
});

setInputFilter(document.getElementById("fechaVenciModificar"), function (value) {
    return /^\d*$/.test(value);
});
setInputFilter(document.getElementById("fechaIniModificar"), function (value) {
    return /^\d*$/.test(value);
});









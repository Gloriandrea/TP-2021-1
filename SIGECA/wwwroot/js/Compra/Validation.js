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

setInputFilter(document.getElementById("cantidadCompraRegistrar"), function (value) {
    return /^\d*$/.test(value);
});

setInputFilter(document.getElementById("costoCompraRegistrar"), function (value) {
    return /^-?\d*[.,]?\d*$/.test(value);
});

setInputFilter(document.getElementById("cantidadCompraModificar"), function (value) {
    return /^\d*$/.test(value);
});

setInputFilter(document.getElementById("costoCompraModificar"), function (value) {
    return /^-?\d*[.,]?\d*$/.test(value);
});
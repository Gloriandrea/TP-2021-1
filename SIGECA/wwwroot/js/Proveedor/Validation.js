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

setInputFilter(document.getElementById("rucProveedorRegistrar"), function (value) {
    return /^\d*$/.test(value);
});

setInputFilter(document.getElementById("rucProveedorModificar"), function (value) {
    return /^\d*$/.test(value);
});

setInputFilter(document.getElementById("celularContactoProveedorRegistrar"), function (value) {
    return /^\d*$/.test(value);
});

setInputFilter(document.getElementById("celularContactoProveedorModificar"), function (value) {
    return /^\d*$/.test(value);
});
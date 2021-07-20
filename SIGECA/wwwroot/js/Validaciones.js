function SwalFireMessageSuccess(title, icon, html) {
    Swal.fire({
        title: '<strong>' + title + '</strong>',
        icon: icon,
        html: html,
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Continuar',
        confirmButtonAriaLabel: 'Continuar',
    });
}

function SwalFireMessageError(title, icon, html) {
    Swal.fire({
        title: '<strong>' + title + '</strong>',
        icon: icon,
        html: html,
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonColor: '#d33',
        confirmButtonText:
            '<i class="fa fa-thumbs-down"></i> Volver',
        confirmButtonAriaLabel: 'Volver',
    });
}
/*validar que sólo se ingrese valores numéricos*/

function valideKey(evt) {

    // code is the decimal ASCII representation of the pressed key.
    var code = (evt.which) ? evt.which : evt.keyCode;

    if (code == 8) { // backspace.
        SwalFireMessageError("Ingrese valores numéricos");
        return true;
    } else if (code >= 48 && code <= 57) { // is a number.
        return true;
    } else { // other keys.
        SwalFireMessageError("Ingrese valores numéricos");
        return false;
    }
}
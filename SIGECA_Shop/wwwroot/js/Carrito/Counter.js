$(document).ready(function () {
    var contador=0;
    if (localStorage.length == 0) {
        contador = 0;
    } else {
        for (var i = 0; i < localStorage.length; i++) {
            if (localStorage.getItem(`cartId${i}`) != null) {
                contador++;
            }
        }
    }
    $('#contadorItems').text(contador);
})
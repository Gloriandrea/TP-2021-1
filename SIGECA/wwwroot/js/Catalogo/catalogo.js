$(function () {
    var myDropzone;
    $("#myDropzone").dropzone({
        url: "/Account/Create",
        dictDefaultMessage: 'Jalar archivos para subir <span>o CLIC AQUÍ</span>',
        autoProcessQueue: false,
        maxFiles: 1,
        addRemoveLinks: true,
        acceptedFiles: "image/*",
        init: function () {
            myDropzone = this;
            this.on("addedfile", function (file) {
                console.log("hola");
                console.log(file);
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (event) {
                };
            });
        }
    });
});
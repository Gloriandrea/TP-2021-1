// Set new default font family and font color to mimic Bootstrap's default styling
//Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
//Chart.defaults.global.defaultFontColor = '#292b2c';

// Bar Chart Example
$(document).ready(function () {
    $.ajax({
        url: 'Home/CantidadProductos',
        type: 'post',
        success: function (data) {
            var res = JSON.parse(data);
            if (res.result) {
                var arrayProductos = res.data.productos;
                var arrayCantidades = res.data.cantidadproductos;
                var ctx = document.getElementById("myBarChart");
                var myLineChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: arrayProductos,
                        datasets: [{
                            label: "Unidades",
                            backgroundColor: "rgba(2,117,216,1)",
                            borderColor: "rgba(2,117,216,1)",
                            data: arrayCantidades,
                        }],
                    },
                    options: {
                        scales: {
                            xAxes: [{
                                time: {
                                    unit: 'product'
                                },
                                gridLines: {
                                    display: false
                                },
                                ticks: {
                                    maxTicksLimit: arrayProductos.length
                                }
                            }],
                            yAxes: [{
                                ticks: {
                                    min: 0,
                                    max: Math.max(...arrayCantidades),
                                    maxTicksLimit: 5
                                },
                                gridLines: {
                                    display: true
                                }
                            }],
                        },
                        legend: {
                            display: false
                        }
                    }
                });
            } else {
                console.log('ERROR al llenar las cantidades de productos');
            }
        }
    });
})


using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SIGECA.DTOs;
using SIGECA.Entities;
using SIGECA.Helpers;
using SIGECA.Models;
using SIGECA.Services;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net.Http;
using System.Threading.Tasks;

namespace SIGECA.Controllers
{
    public class HomeController : Controller
    {
        UrlAPI urlAPI;
        private readonly UsuarioService _usuarioService;
        private readonly InventarioService _inventarioService;
        private readonly ProductoService _productoService;
        private readonly VentaService _ventaService;
        public HomeController(UsuarioService usuarioService, InventarioService inventarioService, ProductoService productoService, VentaService ventaService)
        {
            _usuarioService = usuarioService;
            _inventarioService = inventarioService;
            _productoService = productoService;
            _ventaService = ventaService;
        }

        [HttpGet]
        public async Task<ActionResult> Index()
        {
            List<Inventario> inventarios = await _inventarioService.GetAllInventario();
            ModelHome modelHome = new ModelHome();
            modelHome.inventarios = inventarios;
            int vendida = 0;
            int mayor = 0;
            Producto productoMayor = new Producto();
            foreach (Inventario inv in inventarios)
            {
                int resta = inv.stockInicial - inv.stockFinal;
                vendida += resta;
                if (resta > mayor)
                {
                    mayor = resta;
                    productoMayor = await _productoService.GetById(inv.productoID);
                }
            }
            modelHome.mayorCantidad = productoMayor.nombre;
            modelHome.stockVendida = vendida;
            return View(modelHome);
        }

        public async Task<IActionResult> Index2()
        {
            urlAPI = new UrlAPI($"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}");

            var httpClient = new HttpClient();
            var json = await httpClient.GetStringAsync(urlAPI.Producto);
            IEnumerable<Producto> productos = JsonConvert.DeserializeObject<List<Producto>>(json);
            return View(productos);
        }

        [HttpPost]
        public async Task<ActionResult> CantidadProducto()
        {
            Object result = null;
            try
            {
                result = new { result = "success", title = "Satisfactorio", message = "Venta Registrado Correctamente", url = "Venta/Registro" };
                return Content(JsonConvert.SerializeObject(result));
            }
            catch(Exception ex)
            {
                result = new { result = "error", title = "Error", message = "Lo sentimos, hubo un problema no esperado. Vuelva a intentar por favor. " + ex.Message, url = "" };
                return Content(JsonConvert.SerializeObject(result));
            }
        }

        [HttpPost]
        public async Task<ActionResult> CantidadPedidos()
        {
            Object result = null;
            List<Venta> ventas = await _ventaService.GetAll();
            List<int> numerosSemanal = new List<int> { 0,0,0,0,0,0,0};
            try
            {
                foreach(Venta ven in ventas)
                {
                    switch (ven.fechaVenta.Value.DayOfWeek.ToString())
                    {
                        case "Monday":
                            numerosSemanal[0] += 1;
                            break;
                        case "Tuesday":
                            numerosSemanal[1] += 1;
                            break;
                        case "Wednesday":
                            numerosSemanal[2] += 1;
                            break;
                        case "Thursday ":
                            numerosSemanal[3] += 1;
                            break;
                        case "Friday":
                            numerosSemanal[4] += 1;
                            break;
                        case "Saturday":
                            numerosSemanal[5] += 1;
                            break;
                        case "Sunday":
                            numerosSemanal[6] += 1;
                            break;
                    }
                }
                result = new { result = "success", title = "Satisfactorio", lista = numerosSemanal, message = "Venta Registrado Correctamente", url = "Venta/Registro" };
                return Content(JsonConvert.SerializeObject(result));
            }
            catch(Exception ex)
            {
                result = new { result = "error", title = "Error", message = "Lo sentimos, hubo un problema no esperado. Vuelva a intentar por favor. " + ex.Message, url = "" };
                return Content(JsonConvert.SerializeObject(result));
            }
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
        public class ModelHome
        {
            public IEnumerable<Inventario> inventarios { get; set; }
            public int stockVendida { get; set; }
            public string mayorCantidad { get; set; }
        }
    }
}

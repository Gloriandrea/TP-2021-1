using Microsoft.AspNetCore.Mvc;
using SIGECA_Shop.Models;
using SIGECA_Shop.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace SIGECA_Shop.Controllers
{
    public class TrackingController : Controller
    {
        private readonly VentaService _ventaService;
        private readonly UsuarioService _usuarioService;
        private readonly ProductoService _productoService;
        public TrackingController(VentaService ventaService, UsuarioService usuarioService, ProductoService productoService)
        {
            _ventaService = ventaService;
            _usuarioService = usuarioService;
            _productoService = productoService;
        }
        public async Task<IActionResult> Index()
        {
            return View();
        }
        [HttpPost]
        public async Task<ActionResult> ObtenerProductoPorId(string productoID)
        {
            Object result = null;
            Venta venta = await _ventaService.GetByCodigoVenta(productoID);
            List<Producto> productos = new List<Producto>();
            for (int i = 0; i < venta.items.Count; i++)
            {
                Producto producto = new Producto();
                producto = await _productoService.GetById(venta.items[i].productoID);
                productos.Add(producto);
            }
            result = new { result = "success", title = "Satisfactorio", value = new { venta, productos}, url = "Tracking/Consultar" };
            return Content(JsonConvert.SerializeObject(result));
        }
        public class ModelTracking
        {
            public IEnumerable<Usuario >usuario { get; set; }
            public IEnumerable<Venta> venta { get; set; }
            public IEnumerable<Producto> productos { get; set; }
        }
    }
}

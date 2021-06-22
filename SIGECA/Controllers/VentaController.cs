using Microsoft.AspNetCore.Mvc;
using SIGECA.Entities;
using SIGECA.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SIGECA.Controllers
{
    public class VentaController : Controller
    {
        private readonly VentaService _ventaService;
        private readonly ProductoService _productoService;
        private readonly UsuarioService _usuarioService;
        public VentaController(VentaService ventaService, ProductoService productoService, UsuarioService usuarioService)
        {
            _ventaService = ventaService;
            _productoService = productoService;
            _usuarioService = usuarioService;
        }
        public async Task<IActionResult> Index()
        {
            ModelVenta model = new ModelVenta();
            model.ventas = await _ventaService.GetAll();
            model.productos = await _productoService.GetAll();
            model.usuarios = await _usuarioService.GetAll();
            return View(model);
        }
        [HttpPost]
        public async Task<ActionResult<List<Compra>>> ObtenerVentas()
        {
            List<Venta> ventas = await _ventaService.GetAll();
            return Json(new { recordsFiltered = ventas.Count, recordsTotal = ventas.Count, data = ventas });
        }
        public class ModelVenta
        {
            public IEnumerable<Venta> ventas { get; set; }
            public IEnumerable<Producto> productos { get; set; }
            public IEnumerable<Usuario> usuarios { get; set; }
        }
    }
}

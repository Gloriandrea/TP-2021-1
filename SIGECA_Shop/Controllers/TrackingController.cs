using Microsoft.AspNetCore.Mvc;
using SIGECA_Shop.Models;
using SIGECA_Shop.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
            var model = new ModelTracking();
            model.usuario = await _usuarioService.GetById("60de101c23812efc0a091687");
            model.venta = await _ventaService.GetByIdUsuario("60de101c23812efc0a091687");
            List<Producto> productos = new List<Producto>();
            for(int i = 0; i < model.venta.items.Count; i++)
            {
                Producto prod = new Producto();
                prod = await _productoService.GetById(model.venta.items[i].productoID);
                productos.Add(prod);
            }
            model.productos = productos;
            return View(model);
        }
        public class ModelTracking
        {
            public Usuario usuario { get; set; }
            public Venta venta { get; set; }
            public IEnumerable<Producto> productos { get; set; }
        }
    }
}

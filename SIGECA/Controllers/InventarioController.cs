using Microsoft.AspNetCore.Mvc;
using SIGECA.Entities;
using SIGECA.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA.Controllers
{
    public class InventarioController : Controller
    { 
        private readonly ProductoService _productoService;

        public InventarioController(ProductoService productoService)
        {
            _productoService = productoService;
        }
        
        public async Task< IActionResult> Inventario()
        {
            List<Producto> productos = await _productoService.GetAll();
            List<Categoria> categoriaProductos = await _productoService.GetAllCategoriaProducto();
            ViewBag.categoriaProductos = categoriaProductos;
            return View(productos);
        }
       
    }
}

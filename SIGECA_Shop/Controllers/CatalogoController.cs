using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SIGECA_Shop.Helpers;
using SIGECA_Shop.MTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using SIGECA_Shop.Models;
using SIGECA_Shop.Services;
namespace SIGECA_Shop.Controllers
{
    public class CatalogoController : Controller
    {
        private readonly CatalogoService _catalogoService;
        private readonly UsuarioService _clienteService;
        private readonly ProductoService _productoService;

        public CatalogoController(CatalogoService catalogoService, UsuarioService clienteService, ProductoService productoService)
        {
            _catalogoService = catalogoService;
            _clienteService = clienteService;
            _productoService = productoService;
        }

        public async Task<IActionResult> Index()
        {
            IEnumerable<CatalogoDTO> productos = await _catalogoService.Get();
            return View(productos);
        }
        [HttpPost]
        public async Task<ActionResult> ObtenerProductoPorId(string productoID)
        {
            Object result = null;
            Producto producto = await _productoService.GetById(productoID);
            result = new { result = "success", title = "Satisfactorio", value = producto, url = "Producto/Busqueda" };
            return Content(JsonConvert.SerializeObject(result));
        }
    }
}

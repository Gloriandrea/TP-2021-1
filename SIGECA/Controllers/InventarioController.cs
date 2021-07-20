using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
        private readonly InventarioService _inventarioService;

        public InventarioController(ProductoService productoService, InventarioService inventarioService)
        {
            _productoService = productoService;
            _inventarioService = inventarioService;

        }

        public async Task<IActionResult> Inventario()
        {
            List<Producto> productos = await _productoService.GetAll();
            List<Categoria> categoriaProductos = await _productoService.GetAllCategoriaProducto();
            ViewBag.categoriaProductos = categoriaProductos;
            return View(productos);
        }

        public async Task<ActionResult> VerInventario()
        {
            List<Inventario> inventario = await _inventarioService.GetAllInventario();
            return View();
        }

        [HttpPost]
        public async Task<ActionResult<List<Inventario>>> VerInventarioTabla()
        {
            List<Inventario> inventario = await _inventarioService.GetAllInventario();
            return Json(new { recordsFiltered = inventario.Count, recordsTotal = inventario.Count, data = inventario });
        }

        [HttpPost]
        public async Task<ActionResult<Producto>> RegistrarProductoInventario(Inventario inventario)
        {
            Object result = null;
            try
            {
                inventario = await _inventarioService.CreateInventario(inventario);
                result = new { result = "success", title = "Satisfactorio", productoID = inventario.id, message = "Producto Registrado Correctamente", url = "Producto/Registro" };
                return Content(JsonConvert.SerializeObject(result));
            }
            catch (Exception ex)
            {
                result = new { result = "error", title = "Error", message = "Lo sentimos, hubo un problema no esperado. Vuelva a intentar por favor. " + ex.Message, url = "" };
                return Content(JsonConvert.SerializeObject(result));
            }
        }
        [HttpPost]
        public async Task<ActionResult> ModificarProductoInventario([FromQuery] String productoID, Inventario inventario)
        {
            Object result = null;
            Inventario productoInventarioActualizado = await _inventarioService.UpdateProductoInventario(inventario);
            result = new { result = "success", title = "Satisfactorio", value = productoInventarioActualizado, url = "Inventario/ActualizarProductoInventario" };
            return Content(JsonConvert.SerializeObject(result));
        }

    }
}

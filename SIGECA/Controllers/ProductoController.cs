using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SIGECA.DTOs;
using SIGECA.Entities;
using SIGECA.Helpers;
using SIGECA.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace SIGECA.Controllers
{
    public class ProductoController : Controller
    {
        private readonly ProductoService _productoService;
        public ProductoController(ProductoService productoService)
        {
            _productoService = productoService;
        }
        public async Task<IActionResult> Index()
        {
            List<Producto> productos = await _productoService.GetAll();
            List<TipoProducto> tipoProductos = await _productoService.GetAllTipoProducto();
            ViewBag.tiposProductos = tipoProductos;
            return View(productos);
        }

        [HttpPost]
        public async Task<ActionResult<List<ProductoDTO>>> ObtenerProductos()
        {
            List<ProductoDTO> productos = await _productoService.GetAllProductoDTO();
            return Json(new { recordsFiltered = productos.Count, recordsTotal = productos.Count, data = productos });
        }

        public async Task<ActionResult<Producto>> RegistrarProducto(Producto producto)
        {
            Object result = null;
            try
            {
                producto.stockAdquirido = 0;
                producto.stockDisponible = 0;
                producto = await _productoService.CreateProducto(producto);
                result = new { result = "success", title = "Satisfactorio", message = "Producto Registrado Correctamente", url = "Producto/Registro" };
                return Content(JsonConvert.SerializeObject(result));
            }
            catch (Exception ex)
            {
                result = new { result = "error", title = "Error", message = "Lo sentimos, hubo un problema no esperado. Vuelva a intentar por favor. " + ex.Message, url = "" };
                return Content(JsonConvert.SerializeObject(result));
            }
        }

        [HttpPost]
        public async Task<ActionResult> ObtenerProductoPorId(string productoID)
        {
            Object result = null;
            Producto producto = await  _productoService.GetById(productoID);
            result = new { result = "success", title = "Satisfactorio", value = producto, url = "Producto/Busqueda" };
            return Content(JsonConvert.SerializeObject(result));
        }
        [HttpPost]
        public async Task<ActionResult> ModificarProducto(Producto producto)
        {
            Object result = null;
            Producto productoActualizado = await _productoService.UpdateProducto(producto);
            result = new { result = "success", title = "Satisfactorio", value = productoActualizado, url = "Usuario/ActualizarUsuario" };
            return Content(JsonConvert.SerializeObject(result));
        }
    }
}

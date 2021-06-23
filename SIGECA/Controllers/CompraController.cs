using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SIGECA.Entities;
using SIGECA.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SIGECA.Controllers
{
    public class CompraController : Controller
    {
        private readonly CompraService _compraService;
        private readonly ProveedorService _proveedorService;
        private readonly ProductoService _productoService;
        public CompraController(CompraService compraService, ProveedorService proveedorService, ProductoService productoService)
        {
            _compraService = compraService;
            _proveedorService = proveedorService;
            _productoService = productoService;
        }
        public async Task<IActionResult> Index()
        {
            var model = new ModelCompra();
            model.compras = await _compraService.GetAll();
            model.proveedores = await _proveedorService.GetAll();
            model.productos = await _productoService.GetAll();
            return View(model);
        }

        [HttpPost]
        public async Task<ActionResult> RegistrarCompra([FromBody] Compra compra)
        {
            List<Producto> productos = await _productoService.GetAll();
            Object result = null;
            try
            {
                compra.fecha = DateTime.Now;
                foreach (itemProducto item in compra.items)
                {
                    var itm = productos.Find(i => i.nombre == item.nombre);
                    item.productoID = itm.id;
                }
                compra = (Compra)await _compraService.CreateCompra(compra);
                result = new { result = "success", title = "Satisfactorio", message = "Compra Registrado Correctamente", url = "Compra/Registro" };
                return Content(JsonConvert.SerializeObject(result));
            }
            catch (Exception ex)
            {
                result = new { result = "error", title = "Error", message = "Lo sentimos, hubo un problema no esperado. Vuelva a intentar por favor. " + ex.Message, url = "" };
                return Content(JsonConvert.SerializeObject(result));
            }
        }

        [HttpPost]
        public async Task<ActionResult> ObtenerCompraID(String idcompra)
        {
            Object result = null;
            Compra compra = await _compraService.GetById(idcompra);
            Proveedor proveedor = await _proveedorService.GetById(compra.proveedorID);
            result = new { result = "success", title = "Satisfactorio", value = new { compra, proveedor }, url = "Compra/Consultar" };
            return Content(JsonConvert.SerializeObject(result));
        }

        [HttpPost]
        public async Task<ActionResult> ActualizarCompra([FromBody] Compra compra)
        {
            List<Producto> productos = await _productoService.GetAll();
            Object result = null;
            foreach (itemProducto item in compra.items)
            {
                var itm = productos.Find(i => i.nombre == item.nombre);
                item.productoID = itm.id;
            }
            Compra compraActualizado = await _compraService.UpdateCompra(compra);
            result = new { result = "success", title = "Satisfactorio", value = compraActualizado, url = "Compra/ActualizarUsuario" };
            return Content(JsonConvert.SerializeObject(result));
        }
        [HttpPost]
        public async Task<ActionResult> CambiarEstadoCompra(string compraid, string estadoActual)
        {
            Object result = null;
            await _compraService.UpdateEstadoCompra(compraid, estadoActual);
            result = new { result = "success", title = "Satisfactorio", url = "Compra/ActualizarCompra" };
            return Content(JsonConvert.SerializeObject(result));
        }

        [HttpPost]
        public async Task<ActionResult<List<Compra>>> ObtenerCompras()
        {
            List<Compra> compras = await _compraService.GetAll();
            List<Proveedor> proveedors = await _proveedorService.GetAll();
            foreach (Compra com in compras)
            {
                var prove = proveedors.Find(p => p.id == com.proveedorID);
                com.nombreEmpresa = prove.nombreEmpresa;
                com.proveedorRUC = prove.ruc;
            }
            return Json(new { recordsFiltered = compras.Count, recordsTotal = compras.Count, data = compras });
        }
        public class ModelCompra
        {
            public IEnumerable<Compra> compras { get; set; }
            public IEnumerable<Proveedor> proveedores { get; set; }
            public IEnumerable<Producto> productos { get; set; }
        }
    }
}

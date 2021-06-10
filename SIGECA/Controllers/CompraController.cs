using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
    public class CompraController : Controller
    {
        private readonly CompraService _compraService;
        private readonly ProveedorService _proveedorService;
        public CompraController(CompraService compraService, ProveedorService proveedorService)
        {
            _compraService = compraService;
            _proveedorService = proveedorService;
        }
        public async Task<IActionResult> Index()
        {
            var model = new ModelCompra();
            model.compras = await _compraService.GetAll();
            model.proveedores = await _proveedorService.GetAll();
            return View(model);
        }

        [HttpPost]
        public async Task<ActionResult> RegistrarCompra([FromBody] Compra compra)
        {
            Object result = null;
            try
            {
                compra.fecha = DateTime.Now; 
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
            result = new { result = "success", title = "Satisfactorio", value = compra, url = "Compra/Registro" };
            return Content(JsonConvert.SerializeObject(result));
        }

        [HttpPost]
        public async Task<ActionResult> ActualizarCompra([FromBody] Compra compra)
        {
            Object result = null;
            Compra compraActualizado = await _compraService.UpdateCompra(compra);
            result = new { result = "success", title = "Satisfactorio", value = compraActualizado, url = "Compra/ActualizarUsuario" };
            return Content(JsonConvert.SerializeObject(result));
        }

        [HttpPost]
        public async Task<ActionResult<List<Compra>>> ObtenerCompras()
        {
            List<Compra> compras = await _compraService.GetAll();
            return Json(new { recordsFiltered = compras.Count, recordsTotal = compras.Count, data = compras });
        }
        public class ModelCompra
        {
            public IEnumerable<Compra> compras { get; set; }
            public IEnumerable<Proveedor> proveedores { get; set; }
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SIGECA.Entities;
using SIGECA.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SIGECA.Controllers
{
    public class ProveedorController : Controller
    {
        private readonly ProveedorService _proveedorService;
        public ProveedorController(ProveedorService proveedorService)
        {
            _proveedorService = proveedorService;
        }
        public async Task<IActionResult> Index()
        {
            List<Proveedor> proveedores = await _proveedorService.GetAll();
            return View(proveedores);
        }
        [HttpPost]
        public async Task<ActionResult> RegistrarProveedor(Proveedor proveedor)
        {
            Object result = null;
            try
            {
                proveedor.estado = "activo";
                proveedor = (Proveedor)await _proveedorService.CreateProveedor(proveedor);
                result = new { result = "success", title = "Satisfactorio", message = "Proveedor Registrado Correctamente", url = "Proveedor/Registro" };
                return Content(JsonConvert.SerializeObject(result));
            }
            catch (Exception ex)
            {
                result = new { result = "error", title = "Error", message = "Lo sentimos, hubo un problema no esperado. Vuelva a intentar por favor. " + ex.Message, url = "" };
                return Content(JsonConvert.SerializeObject(result));
            }
        }
        [HttpPost]
        public async Task<ActionResult> ObtenerProveedorID(String idproveedor)
        {
            Object result = null;
            Proveedor proveedor = await _proveedorService.GetById(idproveedor);
            result = new { result = "success", title = "Satisfactorio", value = proveedor, url = "Proveedor/ObtenerID" };
            return Content(JsonConvert.SerializeObject(result));
        }
        [HttpPost]
        public async Task<ActionResult> ActualizarProveedor(Proveedor proveedor)
        {
            Object result = null;
            Proveedor proveedorActualizado = await _proveedorService.UpdateProveedor(proveedor);
            result = new { result = "success", title = "Satisfactorio", value = proveedorActualizado, url = "Proveedor/ActualizarProveedor" };
            return Content(JsonConvert.SerializeObject(result));
        }
        [HttpPost]
        public async Task<ActionResult> CambiarEstadoProveedor(string proveedorid, string estadoActual)
        {
            Object result = null;
            await _proveedorService.UpdateEstadoProveedor(proveedorid, estadoActual);
            result = new { result = "success", title = "Satisfactorio", url = "Proveedor/UpdateEstado" };
            return Content(JsonConvert.SerializeObject(result));
        }

        [HttpPost]
        public async Task<ActionResult<List<Usuario>>> ObtenerProveedores()
        {
            List<Proveedor> proveedores = await _proveedorService.GetAll();
            return Json(new { recordsFiltered = proveedores.Count, recordsTotal = proveedores.Count, data = proveedores });
        }
    }
}

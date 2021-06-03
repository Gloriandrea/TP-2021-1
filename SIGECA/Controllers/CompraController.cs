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
        public CompraController(CompraService compraService)
        {
            _compraService = compraService;
        }
        public async Task<IActionResult> Index()
        {
            List<Compra> compras = await _compraService.GetAll();
            return View(compras);
        }

        [HttpPost]
        public async Task<ActionResult> RegistrarCompra(Compra compra)
        {
            Object result = null;
            try
            {
                compra.fecha = DateTime.Now;
                compra = (Compra)await _compraService.CreateCompra(compra);
                result = new { result = "success", title = "Satisfactorio", message = "Usuario Registrado Correctamente", url = "Usuario/Registro" };
                return Content(JsonConvert.SerializeObject(result));
            }
            catch (Exception ex)
            {
                result = new { result = "error", title = "Error", message = "Lo sentimos, hubo un problema no esperado. Vuelva a intentar por favor. " + ex.Message, url = "" };
                return Content(JsonConvert.SerializeObject(result));
            }
        }
    }
}

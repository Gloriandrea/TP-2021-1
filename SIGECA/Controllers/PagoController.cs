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
    public class PagoController : Controller
    {
        private readonly PagoService _pagoService;

        public PagoController(PagoService pagoService)
        {
            _pagoService = pagoService;
        }

       public async Task<IActionResult> Pago()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult<Venta>> ObtenerVentaPorCodigoVenta(string codigoVenta)
        {
            Object result = null;
            Venta venta = await _pagoService.GetByCodigoVenta(codigoVenta);
            result = new { result = "success",  value = venta };
            return Content(JsonConvert.SerializeObject(result));
        }
    }
}

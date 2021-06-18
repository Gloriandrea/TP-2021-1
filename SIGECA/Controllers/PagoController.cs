using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SIGECA.Entities;
using SIGECA.Helpers;
using SIGECA.Services;
using System;
using System.Collections.Generic;
using System.Net.Http;
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
        /*UrlAPI urlAPI;*/

        public async Task<IActionResult> Pago()
        {
            await _pagoService.GetAll();
            List<Venta> ventas = await _pagoService.GetAll();
            return View(ventas);

            //urlAPI = new UrlAPI($"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}");
            //var httpClient = new HttpClient();
            //var json = await httpClient.GetStringAsync(urlAPI.Pago);
            //List<Venta> ventas = JsonConvert.DeserializeObject<List<Venta>>(json);
            //List<Venta> venta = new List<Venta>();

            //foreach (var vent in ventas)
            //{
            //    if (vent.codigoVenta  > 0) venta.Add(vent);
            //}

            //return View(venta);
        }


        [HttpPost]
        public async Task<ActionResult<List<Usuario>>> obtenerAllVentas()
        {
            List<Venta> venta = await _pagoService.GetAll();
            return Json(new { recordsFiltered = venta.Count, recordsTotal = venta.Count, data = venta });
        }

        [HttpPost]
        public async Task<ActionResult<Venta>> ObtenerVentaPorCodigoVenta(int codigoVenta)
        {
            Object result = null;
            Venta venta = await _pagoService.GetByCodigoVenta(codigoVenta);
            result = new { result = "success", value = venta };
            return Content(JsonConvert.SerializeObject(result));
        }

        [HttpPost]
        public async Task<ActionResult> CambiarEstadoVenta(string codigoVenta, string estado)
        {
            Object result = null;
            await _pagoService.updateEstadoVenta(codigoVenta, estado);
            result = new { result = "success", title = "Satisfactorio", url = "Pago/updateEstado" };
            return Content(JsonConvert.SerializeObject(result));
        }
    }
}

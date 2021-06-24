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
        private readonly ProductoService _productoService;

        public PagoController(PagoService pagoService, ProductoService productoService)
        {
            _pagoService = pagoService;
            _productoService = productoService;
        }  
        /*UrlAPI urlAPI;*/

        public async Task<IActionResult> Pago()
        {
            List<Venta> ventas = await _pagoService.GetAll();            
            return View(ventas);
           
        }


        [HttpPost]
        public async Task<ActionResult<List<Usuario>>> obtenerAllVentas()
        {
            List<Venta> venta = await _pagoService.GetAll();
            return Json(new { recordsFiltered = venta.Count, recordsTotal = venta.Count, data = venta });
        }

        [HttpPost]
        public async Task<ActionResult<Venta>> ObtenerVentaPorCodigoVenta(string codigoVenta)
        {
            Object result = null;
            Venta venta = await _pagoService.GetByCodigoVenta(codigoVenta);
            List<Producto> productos = await _productoService.GetAll();
            foreach (Items item in venta.items)
            {
                var itm = productos.Find(i => i.id == item.productoID);
                item.nombre = itm.nombre;
            }
            result = new { result = "success", value = venta };
            return Content(JsonConvert.SerializeObject(result));
        }

        [HttpPost]
        public async Task<ActionResult> CambiarEstadoVenta(string codigoVenta, string estadoActual)
        {
            Object result = null;
            await _pagoService.updateEstadoVenta(codigoVenta, estadoActual);
            result = new { result = "success", title = "Satisfactorio", url = "Pago/updateEstado" };
            return Content(JsonConvert.SerializeObject(result));           
        }
    }
}

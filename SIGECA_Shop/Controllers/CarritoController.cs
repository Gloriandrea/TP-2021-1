using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SIGECA_Shop.Models;
using SIGECA_Shop.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA_Shop.Controllers
{
    public class CarritoController : Controller
    {
        private readonly VentaService _ventaService;
        private readonly ProductoService _productoService;

        public CarritoController(VentaService ventaService, ProductoService productoService)
        {
            _ventaService = ventaService;
            _productoService = productoService;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> RegistrarVenta([FromBody] Venta venta)
        {
            List<Venta> ventas = await _ventaService.GetAll();
            int record = ventas.Count;
            string codigo = "V-" + Convert.ToString(record + 1).PadLeft(6, '0');
            venta.codigoVenta = codigo;
            Object result = null;
            try
            {
                venta.fechaVenta = DateTime.Now;
                venta = (Venta)await _ventaService.CreateVenta(venta);
                result = new { result = "success", title = "Satisfactorio", message = "Venta Registrado Correctamente",value=venta, url = "Carrito/Registro" };
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

using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SIGECA_Shop.Models;
using SIGECA_Shop.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SIGECA_Shop.Helpers;

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
            List<Producto> productos = await _productoService.GetAll();
            Object result = null;
            try
            {
                venta.fechaVenta = DateTime.Now;
                venta = (Venta)await _ventaService.CreateVenta(venta);
                result = new { result = "success", title = "Satisfactorio", message = "Venta Registrado Correctamente",value=venta, url = "Carrito/Registro" };
                string Htmlbody = Resource.HtmlEnvioCorreo;
                Htmlbody = Htmlbody.Replace("#NOMBRE#", venta.datos.nombres);
                Htmlbody = Htmlbody.Replace("#APELLIDO#", venta.datos.apellidos);
                Htmlbody = Htmlbody.Replace("#CODVENTA#", venta.codigoVenta);
                Htmlbody = Htmlbody.Replace("#TOTAL#","S/. "+ venta.total.ToString("0.00"));
                string productosHTML = string.Empty;
                foreach (ItemsVenta prod in venta.items)
                {
                    Producto prodtemp = productos.Find(x => x.id == prod.productoID);
                    productosHTML += "<tr>";
                    productosHTML += "<td width='75%' align='left' style='font - family: Open Sans, Helvetica, Arial, sans-serif; font - size: 16px; font - weight: 400; line - height: 24px; padding: 15px 10px 5px 10px;'>" + prodtemp.nombre + " ( " + prod.cantidad + " ) " + "</td>";
                    productosHTML += "<td width='25 %' align='left' style='font - family: Open Sans, Helvetica, Arial, sans-serif; font - size: 16px; font - weight: 400; line - height: 24px; padding: 15px 10px 5px 10px;'>" +"S/. " +prod.subTotal.ToString("0.00") + "</td>";
                    productosHTML += "</tr>";
                    prodtemp.stock = prodtemp.stock - prod.cantidad;
                    await _productoService.UpdateProductoStock(prodtemp);
                }
                Htmlbody = Htmlbody.Replace("#PRODUCTOS#", productosHTML);
                await Helpers.Email.SendMail_Gmail(venta.datos.correo, "Su venta con el codigo " + venta.codigoVenta + " en Avicola Nancy, ha sido satisfactoria",Htmlbody);
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

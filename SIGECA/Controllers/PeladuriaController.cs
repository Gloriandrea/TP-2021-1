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
    public class PeladuriaController : Controller
    {
        private readonly ProductoService _productoService;
        public PeladuriaController(ProductoService productoService)
        {
            _productoService = productoService;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> RegistrarProductosPeladuria([FromBody] List<Producto> productos)
        {
            Object result = null;
            List<Producto> produtemp = await _productoService.GetAll();
            try
            {
                foreach (Producto prod in productos)
                {
                    Producto newProducto = new Producto();
                    Producto tempProducto = produtemp.Find(x => x.nombre == prod.nombre);
                    if (tempProducto == null)
                    {
                        newProducto = await _productoService.CreateProducto(prod);
                    }
                    else
                    {
                        tempProducto.stock = tempProducto.stock + prod.stock;
                        newProducto = await _productoService.UpdateProducto(tempProducto);
                    }
                }
                result = new { result = "success", title = "Satisfactorio", url = "Peladuria/Registro" };
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

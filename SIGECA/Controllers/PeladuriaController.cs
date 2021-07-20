using Microsoft.AspNetCore.Http;
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
        private readonly MediaService _mediaService;
        public PeladuriaController(ProductoService productoService, MediaService mediaService)
        {
            _productoService = productoService;
            _mediaService = mediaService;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> RegistrarProductosPeladuria([FromBody] List<Producto> productos)
        {
            Object result = null;
            String qrCode;
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
                        IFormFile qrFile = await _mediaService.generateQRCodeFromID(newProducto.id);
                        qrCode = await _mediaService.RegistrarImagenProducto(qrFile, "qrproductos");
                        await _productoService.UpdateProductoQRCodigo(newProducto.id, qrCode);
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

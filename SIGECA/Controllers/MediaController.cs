using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SIGECA.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA.Controllers
{
    public class MediaController : Controller
    {
        private readonly MediaService _mediaService;
        private readonly ProductoService _productoService;
        public MediaController(MediaService mediaService, ProductoService productoService)
        {
            _mediaService = mediaService;
            _productoService = productoService;
        }

        [HttpPost]
        public async Task<JsonResult> RegistrarImagenProducto(IFormFile file)
        {
            
            String imageUrl;
            Object result = null;
            try
            {
                imageUrl = await _mediaService.RegistrarImagenProducto(file, "productos");
                result = new { result = "success", title = "Satisfactorio", message = "Se registró correctamente" ,url=imageUrl};
                return Json(result);
            }
            catch (Exception ex)
            {
                result = new { result = "error", title = "Error del Servidor", message = "Error: "+ex, url = "null" };
                return Json(result);
            }
        }
        [HttpPost]
        public async Task<JsonResult> ActualizarImagenProducto( String rutaAntigua,String productoId, IFormFile file)
        {
            String imageUrlNueva;
            Object result = null;
            try
            {
                imageUrlNueva = await _mediaService.ActualizarImagenProducto(file, "productos", "https://sigeca.blob.core.windows.net/productos/"+rutaAntigua+".jpg");
                IFormFile qrFile = await _mediaService.generateQRCodeFromID(productoId);
                //generacion de CodigoQR


                await _productoService.UpdateProductoImagen(imageUrlNueva, productoId);
                result = new { result = "success", title = "Satisfactorio", message = "Se registró correctamente", url = imageUrlNueva };
                return Json(result);
            }
            catch (Exception ex)
            {
                result = new { result = "error", title = "Error del Servidor", message = "Error: " + ex, url = "null" };
                return Json(result);
            }
        }

        [HttpPost]
        public async Task<JsonResult> RegistrarImagenQRCodeProducto([FromQuery] String productoID,IFormFile file)
        {

            String imageUrl;
            String qrCode;
            Object result = null;
            try
            {
                IFormFile qrFile = await _mediaService.generateQRCodeFromID(productoID);
                imageUrl = await _mediaService.RegistrarImagenProducto(file, "productos");
                
                qrCode = await _mediaService.RegistrarImagenProducto(qrFile, "qrproductos");
                await  _productoService.UpdateProductoImagenYQRCodigo(productoID, imageUrl, qrCode);
                result = new { result = "success", title = "Satisfactorio", message = "Se registró correctamente", url = productoID };
                return Json(result);
            }
            catch (Exception ex)
            {
                result = new { result = "error", title = "Error del Servidor", message = "Error: " + ex, url = "null" };
                return Json(result);
            }
        }
    }
}

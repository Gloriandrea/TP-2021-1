using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SIGECA.Entities;
using SIGECA.Helpers;
using SIGECA.Services;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using SIGECA.DTOs;
namespace SIGECA.Controllers
{
    public class CatalogoController : Controller
    {
        private readonly CatalogoService _catalogoService;
        private readonly OfertaService _ofertaService;
        private readonly ProductoService _productoService;

        public CatalogoController(CatalogoService catalogoService, ProductoService productoService, OfertaService ofertaService)
        {
            _catalogoService = catalogoService;
            _productoService = productoService;
            _ofertaService = ofertaService;

        }
        public async Task<IActionResult> Index()
        {
            var model = new ModelOferta();
            model.ofertas = await _catalogoService.AllOferta();
            model.productos = await _productoService.GetAll();
            model.tiendas = await _catalogoService.AllTienda();
            return View(model);
        }
        [HttpPost]
        public async Task<ActionResult<List<Producto>>> ObtenerOfertas()
        {
            List<Producto> productos = await _catalogoService.TraerListaProducto();
            //List<ProductoDTO> productos = await _productoService.GetAllProductoDTO();
            return Json(new { recordsFiltered = productos.Count, recordsTotal = productos.Count, data = productos });
        }
        [HttpPost]
        public async Task<ActionResult> ObtenerOfertaPorId(String productoID)
        {
            Object result = null;
            Producto producto = await _productoService.GetById(productoID);
            Categoria categoria = await _productoService.GetCategoryNameByID(producto.categoriaID);
            Oferta oferta = await _ofertaService.GetById(producto.id);
            if (oferta != null)
            {
                Tienda tienda = await _catalogoService.GetTiendaById(oferta.tiendaID);
                result = new { result = "success", title = "Satisfactorio", value = new { producto, categoria, oferta, tienda }, url = "Catalogo/Consultar" };
            }
            else
            {
                result = new { result = "fail", title = "Error", value = new { producto, categoria, oferta }, url = "Catalogo/Consultar" };
            }
            return Content(JsonConvert.SerializeObject(result));
        }
        public async Task<ActionResult> ObtenerProductoPorId(String productoID)
        {
            Object result = null;
            Producto producto = await _productoService.GetById(productoID);
            Categoria categoria = await _productoService.GetCategoryNameByID(producto.categoriaID);

            result = new { result = "success", title = "Satisfactorio", value = new { producto, categoria }, url = "Catalogo/Consultar" };
            return Content(JsonConvert.SerializeObject(result));
        }
        [HttpPost]
        public async Task<ActionResult> RegistrarOferta([FromBody] Oferta oferta)
        {
            Object result = null;
            try
            {
                oferta = (Oferta)await _catalogoService.CreateOferta(oferta);
                result = new { result = "success", title = "Satisfactorio", message = "Oferta Registrada Correctamente", url = "Catalogo/Registro" };
                return Content(JsonConvert.SerializeObject(result));
            }
            catch (Exception ex)
            {
                result = new { result = "error", title = "Error", message = "Lo sentimos, hubo un problema no esperado. Vuelva a intentar por favor. " + ex.Message, url = "" };
                return Content(JsonConvert.SerializeObject(result));
            }
        }
        [HttpPost]
        public async Task<ActionResult> ActualizarOfertaPorcentaje([FromBody] Oferta oferta)
        {
            Object result = null;
            try
            {
                oferta = (Oferta)await _catalogoService.UpdateOfertaPorcentaje(oferta);
                result = new { result = "success", title = "Satisfactorio", message = "Oferta Registrada Correctamente", url = "Catalogo/Registro" };
                return Content(JsonConvert.SerializeObject(result));
            }
            catch (Exception ex)
            {
                result = new { result = "error", title = "Error", message = "Lo sentimos, hubo un problema no esperado. Vuelva a intentar por favor. " + ex.Message, url = "" };
                return Content(JsonConvert.SerializeObject(result));
            }
        }
        [HttpPost]
        public async Task<ActionResult> ActualizarOfertaMulti([FromBody] Oferta oferta)
        {
            Object result = null;
            try
            {
                oferta = (Oferta)await _catalogoService.UpdateOfertaMulti(oferta);
                result = new { result = "success", title = "Satisfactorio", message = "Oferta Registrada Correctamente", url = "Catalogo/Registro" };
                return Content(JsonConvert.SerializeObject(result));
            }
            catch (Exception ex)
            {
                result = new { result = "error", title = "Error", message = "Lo sentimos, hubo un problema no esperado. Vuelva a intentar por favor. " + ex.Message, url = "" };
                return Content(JsonConvert.SerializeObject(result));
            }
        }
        public class ModelOferta
        {
            public IEnumerable<Producto> productos { get; set; }
            public IEnumerable<Oferta> ofertas { get; set; }
            public IEnumerable<Tienda> tiendas { get; set; }
        }

    }

}

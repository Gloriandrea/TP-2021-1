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
            model.ofertas = await _catalogoService.GetAll();
            model.productos = await _productoService.GetAll();
            return View(model);
        }
        [HttpPost]
        public async Task<ActionResult<List<Oferta>>> ObtenerOfertas()
        {
            List<Oferta> ofertas = await _catalogoService.GetAll();
            List<Producto> productos = await _productoService.GetAll();
            foreach (Oferta ofer in ofertas)
            {
                var prod = productos.Find(p => p.id == ofer.productoID);
                ofer.nombrePorducto = prod.nombre;
                ofer.tipoVenta = prod.tipoVenta;
                ofer.precioProducto = prod.precio;
                ofer.stockProducto = prod.stock;
            }
            return Json(new { recordsFiltered = ofertas.Count, recordsTotal = ofertas.Count, data = ofertas });
        }
        [HttpPost]
        public async Task<ActionResult> ObtenerOfertaPorId(String productoID)
        {
            Object result = null;
            Producto producto = await _productoService.GetById(productoID);
            Categoria categoria = await _productoService.GetCategoryNameByID(producto.categoriaID);
            Oferta oferta = await _ofertaService.GetById(producto.id);
            result = new { result = "success", title = "Satisfactorio", value = new { producto, categoria, oferta }, url = "Catalogo/Consultar" };
            return Content(JsonConvert.SerializeObject(result));
        }
        

            foreach(var producto in productos) 
            {
                if (producto.stock > 0) catalogo.Add(producto);
            }

            return View(catalogo);
        }
    }
}

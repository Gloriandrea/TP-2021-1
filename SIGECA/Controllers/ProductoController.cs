﻿    using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SIGECA.DTOs;
using SIGECA.Entities;
using SIGECA.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SIGECA.Controllers
{
    public class ProductoController : Controller
    {
        private readonly ProductoService _productoService;
        public ProductoController(ProductoService productoService)
        {
            _productoService = productoService;
        }
        public async Task<IActionResult> Index()
        {
            List<Producto> productos = await _productoService.GetAll();
            List<Categoria> categoriaProductos = await _productoService.GetAllCategoriaProducto();
            ViewBag.categoriaProductos = categoriaProductos;
            return View(productos);
        }

        [HttpPost]
        public async Task<ActionResult<List<ProductoDTO>>> ObtenerProductos()
        {
            List<ProductoDTO> productos = await _productoService.GetAllProductoDTO();
            return Json(new { recordsFiltered = productos.Count, recordsTotal = productos.Count, data = productos });
        }

        public async Task<ActionResult<Producto>> RegistrarProducto(Producto producto)
        {
            Object result = null;
            try
            {
                producto = await _productoService.CreateProducto(producto);
                result = new { result = "success", title = "Satisfactorio",productoID=producto.id, message = "Producto Registrado Correctamente", url = "Producto/Registro" };
                return Content(JsonConvert.SerializeObject(result));
            }
            catch (Exception ex)
            {
                result = new { result = "error", title = "Error", message = "Lo sentimos, hubo un problema no esperado. Vuelva a intentar por favor. " + ex.Message, url = "" };
                return Content(JsonConvert.SerializeObject(result));
            }
        }

        [HttpPost]
        public async Task<ActionResult> ObtenerProductoPorId(string productoID)
        {
            Object result = null;
            Producto producto = await  _productoService.GetById(productoID);
            Categoria category = await _productoService.GetCategoryNameByID(producto.categoriaID);
            result = new { result = "success", title = "Satisfactorio", value = new { producto, category }, url = "Producto/Busqueda" };
            return Content(JsonConvert.SerializeObject(result));
        }
        [HttpPost]
        public async Task<ActionResult> ModificarProducto([FromQuery] String productoID, Producto producto)
        {
            Object result = null;
            Producto productoActualizado = await _productoService.UpdateProducto(producto);
            result = new { result = "success", title = "Satisfactorio", value = productoActualizado, url = "Usuario/ActualizarUsuario" };
            return Content(JsonConvert.SerializeObject(result));
        }

        [HttpPost]
        public async Task<ActionResult> ObtenerNombreCategoriaPorId(string productoId)
        {
            Object result = null;
            Categoria category = await _productoService.GetCategoryNameByID(productoId);
            Producto producto = await  _productoService.GetById(category.nombre);

            result = new { result = "success", title = "Satisfactorio", value = category, url = "Producto/Busqueda" };
            return Content(JsonConvert.SerializeObject(result));
        }

        [HttpGet]
        public async Task<ActionResult> ObtenerProductoOfertaPorTienda(string productoId)
        {
            Object result = null;
            List<ProductoOfertaDTO> producto = await _productoService.ObtenerProductoOfertaPorTienda(productoId);
            result = new { result = "success", title = "Satisfactorio", value = producto, url = "Producto/Tienda/Oferta" };
            return Content(JsonConvert.SerializeObject(result));
        }

    }
}

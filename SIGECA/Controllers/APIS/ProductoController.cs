using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SIGECA.Entities;
using SIGECA.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA.Controllers.APIS
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        private readonly ProductoService _productoService;

        public ProductoController(ProductoService productoServices)
        {
            _productoService = productoServices;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _productoService.Get());
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _productoService.GetAll());
        }


        // GET api/<productoController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            return Ok(await _productoService.GetById(id));
        }

        // POST api/<productoController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Producto producto)
        {
            if (producto == null) return BadRequest();

            await _productoService.Create(producto);

            return CreatedAtAction("GetById", new { id = producto.id }, producto);
        }

        // PUT api/<productoController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] Producto producto)
        {

            if (producto == null) return BadRequest();

            await _productoService.UpdateById(id, producto);

            return CreatedAtAction("GetById", new { id = producto.id }, producto);
        }

        // DELETE api/<productoController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _productoService.DeleteById(id);
            return NoContent();
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using SIGECA.Entities;
using SIGECA.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SIGECA.Controllers.APIS
{
    [Route("api/[controller]")]
    [ApiController]
    public class CatalogoController : ControllerBase
    {
        private readonly ProductoService _catalogoService;

        public CatalogoController(ProductoService productoServices)
        {
            _catalogoService = productoServices;
        }

        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _catalogoService.GetAll());
        }


        // GET api/<CatalogoController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            return Ok(await _catalogoService.GetById(id));
        }

        // POST api/<CatalogoController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Producto producto)
        {
            if (producto == null) return BadRequest();

            await _catalogoService.Create(producto);

            return CreatedAtAction("GetById", new { id = producto.id }, producto);
        }

        // PUT api/<CatalogoController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] Producto producto)
        {

            if (producto == null) return BadRequest();

            await _catalogoService.UpdateById(id, producto);

            return CreatedAtAction("GetById", new { id = producto.id }, producto);
        }

        // DELETE api/<CatalogoController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _catalogoService.DeleteById(id);
            return NoContent();
        }
    }
}

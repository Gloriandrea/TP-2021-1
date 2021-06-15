using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SIGECA_Shop.Models;
using SIGECA_Shop.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA_Shop.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly UsuarioService _clienteService;

        public ClienteController(UsuarioService clienteServices)
        {
            _clienteService = clienteServices;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _clienteService.Get());
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _clienteService.GetAll());
        }


        // GET api/<ClienteController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            return Ok(await _clienteService.GetById(id));
        }

        // POST api/<ClienteController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Usuario cliente)
        {
            if (cliente == null) return BadRequest();

            await _clienteService.Create(cliente);

            return CreatedAtAction("GetById", new { id = cliente.id }, cliente);
        }

        // PUT api/<ClienteController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] Usuario cliente)
        {

            if (cliente == null) return BadRequest();

            await _clienteService.UpdateById(id, cliente);

            return CreatedAtAction("GetById", new { id = cliente.id }, cliente);
        }

        // DELETE api/<ClienteController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _clienteService.DeleteById(id);
            return NoContent();
        }

        [HttpPost("Login/")]
        public async Task<IActionResult> Login(Usuario cliente)
        {
            var response = await _clienteService.Login(cliente);
            if (response == null) return BadRequest();
            var result = new OkObjectResult(new { message = "¡Logeado exitosamente!" });
            return result;
        }

    }
}

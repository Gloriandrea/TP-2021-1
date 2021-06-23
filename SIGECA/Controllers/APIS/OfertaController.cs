using Microsoft.AspNetCore.Mvc;
using SIGECA.Entities;
using SIGECA.Services;
using System.Threading.Tasks;

namespace SIGECA.Controllers.APIS
{
    [Route("api/[controller]")]
    [ApiController]
    public class OfertaController : ControllerBase
    {
        private readonly OfertaService _ofertaService;

        public OfertaController(OfertaService ofertaServices)
        {
            _ofertaService = ofertaServices;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _ofertaService.Get());
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _ofertaService.GetAll());
        }


        // GET api/<ofertaController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            return Ok(await _ofertaService.GetById(id));
        }

        // POST api/<ofertaController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Oferta oferta)
        {
            if (oferta == null) return BadRequest();

            await _ofertaService.Create(oferta);

            return CreatedAtAction("GetById", new { id = oferta.id }, oferta);
        }

        // PUT api/<ofertaController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] Oferta oferta)
        {

            if (oferta == null) return BadRequest();

            await _ofertaService.UpdateById(id, oferta);

            return CreatedAtAction("GetById", new { id = oferta.id }, oferta);
        }

        // DELETE api/<ofertaController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _ofertaService.DeleteById(id);
            return NoContent();
        }
    }
}

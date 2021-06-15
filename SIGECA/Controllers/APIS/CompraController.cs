using Microsoft.AspNetCore.Mvc;
using SIGECA.Services;
using System.Threading.Tasks;

namespace SIGECA.Controllers.APIS
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompraController : ControllerBase
    {
        private readonly CompraService _compraService;

        public CompraController(CompraService compraService)
        {
            _compraService = compraService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _compraService.GetAll());
        }
    }
}

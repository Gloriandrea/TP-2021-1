using Microsoft.AspNetCore.Mvc;
using SIGECA.Services;
using System.Threading.Tasks;

namespace SIGECA.Controllers.APIS
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly UsuarioService _usuarioService;

        public UsuarioController(UsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _usuarioService.GetAll());
        }
    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SIGECA.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA.Controllers.APIS
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProveedorController : ControllerBase
    {
        private readonly ProveedorService _proveedorService;

        public ProveedorController(ProveedorService proveedorService)
        {
            _proveedorService = proveedorService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _proveedorService.GetAll());
        }
    }
}

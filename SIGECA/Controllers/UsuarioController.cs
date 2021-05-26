using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SIGECA.Entities;
using SIGECA.Helpers;
using SIGECA.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA.Controllers
{
    /*[Route("api/[controller]")]
    [ApiController]*/
    public class UsuarioController : ControllerBase
    {
        private readonly UsuarioService _usuarioservice;
        private readonly IFileStorage _fileStorage;

        public UsuarioController(UsuarioService usuarioservice, IFileStorage fileStorage)
        {
            _usuarioservice = usuarioservice;
            _fileStorage = fileStorage;
        }

        //[HttpGet("all")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public ActionResult<List<Usuario>> GetAll()
        {
            return _usuarioservice.GetAll();
        }
    }
}

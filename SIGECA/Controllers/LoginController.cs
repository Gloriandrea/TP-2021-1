using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SIGECA.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SIGECA.Controllers
{
    public class LoginController : Controller
    {

        private readonly UsuarioService _usuarioService;
        public LoginController(UsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> LogearUsuario(string nombreUsuario, string clave)
        {
            Object result = null;
            bool login = await _usuarioService.Login(nombreUsuario, clave);
            result = new { result = "success", title = "Satisfactorio", value = login, url = "Producto/Busqueda" };
            return Content(JsonConvert.SerializeObject(result));
        }
    }
}

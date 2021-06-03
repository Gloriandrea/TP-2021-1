using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SIGECA.Entities;
using SIGECA.Helpers;
using SIGECA.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA.Controllers
{
    public class ClienteController :Controller
    {
        private readonly UsuarioService _usuarioService;

        public ClienteController(UsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        public async Task<IActionResult> Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> RegistrarCliente(Cliente usuario)
        {
            Object result = null;
            try
            {
                usuario.nombreUsuario = usuario.nombreUsuario;
                usuario.contraseña = usuario.contraseña;
                usuario.estado = "activo";
                usuario.tipoUsuario = "Cliente";
                usuario = (Cliente)await _usuarioService.CreateUsuarioCliente(usuario);
                result = new { result = "success", title = "Satisfactorio", message = "Cliente Registrado Correctamente", url = "Cliente/Registro" };
                return Content(JsonConvert.SerializeObject(result));
            }
            catch (Exception ex)
            {
                result = new { result = "error", title = "Error", message = "Lo sentimos, hubo un problema no esperado. Vuelva a intentar por favor. " + ex.Message, url = "" };
                return Content(JsonConvert.SerializeObject(result));
            }
        }
    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SIGECA.Entities;
using SIGECA.Helpers;
using SIGECA.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace SIGECA.Controllers
{

    public class UsuarioController : Controller
    {
        private readonly UsuarioService _usuarioService;
        public UsuarioController(UsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }
        public async Task<IActionResult> Index()
        {
            //urlAPI = new UrlAPI($"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}");

            /*var httpClient = new HttpClient();
            var json = await httpClient.GetStringAsync(urlAPI.Usuario);*/
            List<Usuario> usuarios = /*new List<Usuario>();*/await _usuarioService.GetAll();
            return View(usuarios);
        }

        [HttpPost]
        public async Task<ActionResult> RegistrarUsuario(Trabajador usuario)
        {
            Object result = null;
            try {
                usuario.nombreUsuario = usuario.datos.email;
                usuario.contraseña = usuario.datos.numeroDocumento;
                usuario.estado = "activo";
                usuario = (Trabajador)await _usuarioService.CreateUsuarioTrabajar(usuario);
                result = new { result = "success", title = "Satisfactorio", message = "Usuario Registrado Correctamente", url = "Usuario/Registro"};
                return Content(JsonConvert.SerializeObject(result));
            }
            catch (Exception ex) {
                result = new { result = "error", title = "Error", message = "Lo sentimos, hubo un problema no esperado. Vuelva a intentar por favor. " + ex.Message, url = "" };
                return Content(JsonConvert.SerializeObject(result));
            }
        }

        [HttpPost]
        public async Task<ActionResult> ObtenerUsuarioID(String idusuario)
        {
            Object result = null;
            Usuario usuario = await _usuarioService.GetById(idusuario);
            result = new { result = "success", title = "Satisfactorio", value = usuario, url = "Usuario/Registro" };
            return Content(JsonConvert.SerializeObject(result));
            
        }

        [HttpPost]
        public async Task<ActionResult> RegistrarCliente(Cliente usuario)
        {
            Object result = null;
            try
            {
                usuario.nombreUsuario = usuario.datos.email;
                usuario.contraseña = usuario.datos.numeroDocumento;
                usuario.estado = "activo";
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

        public async Task<IActionResult> Index2()
        {
            //urlAPI = new UrlAPI($"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}");

            /*var httpClient = new HttpClient();
            var json = await httpClient.GetStringAsync(urlAPI.Usuario);*/
            List<Usuario> usuarios = /*new List<Usuario>();*/await _usuarioService.GetByType("Cliente");
            return View(usuarios);
        }
    }
}

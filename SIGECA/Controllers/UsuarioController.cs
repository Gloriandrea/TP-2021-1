using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SIGECA.Entities;
using SIGECA.Services;
using System;
using System.Collections.Generic;
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

        public async Task<IActionResult> cambiarContraseña()
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
            try
            {
                usuario.nombreUsuario = usuario.datos.email;
                usuario.contraseña = usuario.datos.numeroDocumento;
                usuario.estado = "activo";
                usuario = (Trabajador)await _usuarioService.CreateUsuarioTrabajar(usuario);
                result = new { result = "success", title = "Satisfactorio", message = "Usuario Registrado Correctamente", url = "Usuario/Registro" };
                return Content(JsonConvert.SerializeObject(result));
            }
            catch (Exception ex)
            {
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
        public async Task<ActionResult> ActualizarUsuario(Usuario usuario)
        {
            Object result = null;
            Usuario usuarioActualizado = await _usuarioService.UpdateUsuario(usuario);
            result = new { result = "success", title = "Satisfactorio", value = usuarioActualizado, url = "Usuario/ActualizarUsuario" };
            return Content(JsonConvert.SerializeObject(result));
        }

        [HttpPost]
        public async Task<ActionResult> CambiarEstadoUsuario(string usuarioid, string estadoActual)
        {
            Object result = null;
            await _usuarioService.UpdateEstadoUsuario(usuarioid, estadoActual);
            result = new { result = "success", title = "Satisfactorio", url = "Usuario/ActualizarUsuario" };
            return Content(JsonConvert.SerializeObject(result));
        }

        [HttpPost]
        public async Task<ActionResult<List<Usuario>>> ObtenerUsuarios()
        {
            List<Usuario> usuarios = await _usuarioService.GetAll();
            return Json(new { recordsFiltered = usuarios.Count, recordsTotal = usuarios.Count, data = usuarios });
        }

        [HttpPost]
        public async Task<ActionResult> CambiarContraseña(string usuarioid, string contraseña, string contraseña2)
        {
            Object result = null;
            usuarioid = "60b8fde409748c69e70bf081";
            if (contraseña != contraseña2)
            {
                result = new { result = "error", title = "Error", message = "Lo sentimos, hubo un problema no esperado. Vuelva a intentar por favor. ", url = "" };
                return Content(JsonConvert.SerializeObject(result));
            }
            else
            {
                if(contraseña == null || contraseña2 == null)
                {
                    result = new { result = "error", title = "Error", message = "Lo sentimos, hubo un problema no esperado. Vuelva a intentar por favor. ", url = "" };
                    return Content(JsonConvert.SerializeObject(result));
                }
                else
                {
                    await _usuarioService.UpdateContraseñaUsuario(usuarioid, contraseña);
                    result = new { result = "success", title = "Satisfactorio", message = "Contraseña Cambiada Correctamente", url = "Usuario/CambiarContraseña" };
                    return Content(JsonConvert.SerializeObject(result));
                }
            }
        }
    }
}

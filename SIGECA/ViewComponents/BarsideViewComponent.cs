using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SIGECA.DTOs;
using SIGECA.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA.ViewComponents
{
    [ViewComponent(Name = "Barside")]
    public class BarsideViewComponent : ViewComponent 
    {
        private readonly UsuarioService _usuarioService;
        public BarsideViewComponent(UsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        public async Task<IViewComponentResult> InvokeAsync(string usuarioID)
        {
            UsuarioDTO userData = await _usuarioService.getUsuariosRolPermiso(usuarioID);
            return await Task.FromResult((IViewComponentResult)View("Index", userData));
        }

    }
}

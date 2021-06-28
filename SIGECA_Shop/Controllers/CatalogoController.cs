using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SIGECA_Shop.Helpers;
using SIGECA_Shop.MTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using SIGECA_Shop.Models;
using SIGECA_Shop.Services;
namespace SIGECA_Shop.Controllers
{
    public class CatalogoController : Controller
    {
        private readonly CatalogoService _catalogoService;
        private readonly UsuarioService _clienteService;

        public CatalogoController(CatalogoService catalogoService, UsuarioService clienteService)
        {
            _catalogoService = catalogoService;
            _clienteService = clienteService;
        }

        public async Task<IActionResult> Index()
        {
            IEnumerable<CatalogoDTO> productos = await _catalogoService.Get();
            return View(productos);
        }
    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using SIGECA_Shop.Helpers;
using SIGECA_Shop.Models;
using SIGECA_Shop.MTOs;
using SIGECA_Shop.Services;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace SIGECA_Shop.Controllers
{
    public class HomeController : Controller
    {
        private readonly CatalogoService _catalogoService;
        private readonly UsuarioService _clienteService;

        public HomeController(CatalogoService catalogoService, UsuarioService clienteService)
        {
            _catalogoService = catalogoService;
            _clienteService = clienteService;
        }

        public async Task<IActionResult> Index()
        {
            IEnumerable<CatalogoDTO> productos = await _catalogoService.Get();
            return View(productos);
        }

        public async Task<IActionResult> Login()
        {
            return View();
        }

        public async Task<IActionResult> NewClient()
        {
            return View();
        }

        public async Task<IActionResult> Logear(Cliente usuario)
        {
            try
            {

                var response = await _clienteService.Login(usuario);

                return RedirectToAction("Index", "Home");

            }
            catch (HttpRequestException e)
            {
                Console.WriteLine("\n HTTP  Exception Caught!");
                Console.WriteLine("Message :{0} ", e.Message);
                return RedirectToAction("Login", "Home");
            }
            finally
            {
                
            }
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

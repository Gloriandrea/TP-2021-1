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
using SIGECA_Shop.MTOs;
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

    }
}

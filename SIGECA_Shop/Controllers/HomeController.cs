using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using SIGECA_Shop.Helpers;
using SIGECA_Shop.Models;
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
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public async Task<IActionResult> Index()
        {
            return View();
        }

        public async Task<IActionResult> Login()
        {
            return View();
        }

        UrlAPI url;
        public async Task<IActionResult> Logear(Cliente usuario)
        {
            HttpClient client = new();
            try
            {

                var url = new UrlAPI();
                string x = url.Login();
                HttpResponseMessage response = await client.PostAsJsonAsync(url.Login(), usuario);
                response.EnsureSuccessStatusCode();
                string responseBody = await response.Content.ReadAsStringAsync();

                Console.WriteLine(responseBody);
                var token = JsonConvert.DeserializeObject<UserToken>(responseBody);

                HttpContext.Response.Cookies.Append("Token", token.Token, new Microsoft.AspNetCore.Http.CookieOptions()
                {
                    Expires = DateTime.Now.AddDays(1)
                });

                //var user = await _userManager.FindByEmailAsync(usuario.nombreUsuario);
                //await _signInManager.PasswordSignInAsync(user, iusuarionf.Password, false, false);

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
                client.Dispose();
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

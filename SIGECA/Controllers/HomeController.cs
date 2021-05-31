using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SIGECA.Entities;
using SIGECA.Helpers;
using SIGECA.Models;
using Newtonsoft.Json;

namespace SIGECA.Controllers
{
    public class HomeController : Controller
    {
        UrlAPI urlAPI;
       

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> Index2()
        {
            urlAPI = new UrlAPI($"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}");

            var httpClient = new HttpClient();
            var json = await httpClient.GetStringAsync(urlAPI.Producto);
            IEnumerable<Producto> productos = JsonConvert.DeserializeObject<List<Producto>>(json);
            return View(productos);
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

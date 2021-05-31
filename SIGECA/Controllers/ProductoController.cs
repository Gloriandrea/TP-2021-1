using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SIGECA.Entities;
using SIGECA.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace SIGECA.Controllers
{
    public class ProductoController : Controller
    {
        UrlAPI urlAPI;
        public async Task<IActionResult> Index()
        {
            urlAPI = new UrlAPI($"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}");

            var httpClient = new HttpClient();
            var json = await httpClient.GetStringAsync(urlAPI.Producto);
            IEnumerable<Producto> productos = JsonConvert.DeserializeObject<List<Producto>>(json);
            return View(productos);
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SIGECA_Shop.Helpers;
using SIGECA_Shop.MTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace SIGECA_Shop.Controllers
{
    public class CatalogoController : Controller
    {
        UrlAPI urlAPI;
        public async Task<IActionResult> Index()
        {
            urlAPI = new UrlAPI($"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}");
            var httpClient = new HttpClient();
            var json = await httpClient.GetStringAsync(urlAPI.Catalogo);
            IEnumerable<CatalogoDTO> productos = JsonConvert.DeserializeObject<List<CatalogoDTO>>(json);
            return View(productos);
        }
    }
}

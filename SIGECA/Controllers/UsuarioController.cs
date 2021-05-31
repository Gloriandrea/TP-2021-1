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
        UrlAPI urlAPI;
        public async Task<IActionResult> Index()
        {
            urlAPI = new UrlAPI($"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}");

            var httpClient = new HttpClient();
            var json = await httpClient.GetStringAsync(urlAPI.Usuario);
            IEnumerable<Usuario> usuarios = JsonConvert.DeserializeObject<List<Usuario>>(json);
            return View(usuarios);
        }
    }
}

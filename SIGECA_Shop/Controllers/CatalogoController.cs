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
        public async Task<IActionResult> Index()
        {
            return View();
        }
    }
}

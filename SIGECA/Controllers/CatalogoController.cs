using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA.Controllers
{
    public class CatalogoController : Controller
    {

        public async Task<IActionResult> Index()
        {
            return View();
        }
    }
}

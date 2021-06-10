using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA.Controllers
{
    public class PagoController : Controller
    {
       public IActionResult Cobro()
        {
            return View();
        }
    }
}

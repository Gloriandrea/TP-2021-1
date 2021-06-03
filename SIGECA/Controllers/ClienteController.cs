using Microsoft.AspNetCore.Mvc;
using SIGECA.Helpers;
using SIGECA.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA.Controllers
{
    public class ClienteController :Controller
    {
        public async Task<IActionResult> Index()
        {
            return View();
        }

    }
}

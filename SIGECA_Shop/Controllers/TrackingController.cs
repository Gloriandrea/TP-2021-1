﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA_Shop.Controllers
{
    public class TrackingController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}

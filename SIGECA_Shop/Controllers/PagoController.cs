using Microsoft.AspNetCore.Mvc;
using SIGECA_Shop.Models;
using SIGECA_Shop.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIGECA_Shop.Controllers
{
    public class PagoController : Controller
    {
        private readonly VentaService _ventaService;
        public PagoController(VentaService ventaService)
        {
            _ventaService = ventaService;
        }
        public async Task<IActionResult> Index(string ventaid)
        {
            Venta venta = new Venta();
            venta = await _ventaService.GetById(ventaid);
            return View(venta);
        }
    }
}

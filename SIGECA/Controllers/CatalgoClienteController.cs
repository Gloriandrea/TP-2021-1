using Microsoft.AspNetCore.Mvc;

namespace SIGECA.Controllers
{
    public class CatalgoClienteController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}

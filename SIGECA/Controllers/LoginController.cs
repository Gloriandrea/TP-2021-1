using Microsoft.AspNetCore.Mvc;

namespace SIGECA.Controllers
{
    public class LoginController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}

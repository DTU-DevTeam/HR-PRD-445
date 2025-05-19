using Microsoft.AspNetCore.Mvc;

namespace ManagementDashboard.UI.Controllers
{
    [Route("[Controller]/[action]")]
    public class StatusResponseController : Controller
    {
        public IActionResult NotFound()
        {
            return View();
        }

        public IActionResult Unauthorized()
        {
            return View();
        }

        public IActionResult Forbidden()
        {
            return View();
        }
    }
}

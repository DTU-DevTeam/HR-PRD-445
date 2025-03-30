using ManagementDashboard.Core.Domain.Entities;
using ManagementDashboard.Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace ManagementDashboard.UI.Controllers
{
    [Route("[Controller]/[action]")]
    public class PayRollController : Controller
    {
        public readonly PayRollRepository _PayRollRepository;
        public readonly DepartmentsRepository _DepartmentsRepository;

        public PayRollController(PayRollRepository payRollRepository, DepartmentsRepository departmentsRepository)
        {
            
            _PayRollRepository = payRollRepository;
            _DepartmentsRepository = departmentsRepository;
        }

        
        [HttpGet]
        public IActionResult PayRolls()
        {
            List<PayRoll_MySQL> luongNhanViens = _PayRollRepository.GetAll().Result;

            return View(luongNhanViens);
        }
    }
}

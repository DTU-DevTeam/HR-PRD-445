using ManagementDashboard.Core.Services.HRServices;
using ManagementDashboard.Core.Services.PayRollServices;
using ManagementDashboard.Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace ManagementDashboard.UI.Controllers
{
    [Route("[Controller]/[action]")]
    public class DashboardController : Controller
    {
        public readonly HRGetterService _hrGetterService;
        public readonly PayRollGetterService _payRollRepository;
       
        public DashboardController(HRGetterService hRGetterService, PayRollGetterService payRollGetterService)
        {
            _hrGetterService = hRGetterService;
            _payRollRepository = payRollGetterService;
        }

        [HttpGet]
        public async Task<IActionResult> DashboardData()
        {
            // count gender
            var employees = await _hrGetterService.GetAllEmployees();

            var countGender = employees
            .GroupBy(e => e.Gender)
            .Select(g => new
            {
                Gender = g.Key,
                Count = g.Count()
            });


            // count employees
            var countEmployees = employees.Count();

            // average salary
            var salaries = await _payRollRepository.GetAllSalaries();

            var averageSalary = salaries.Average(s => s.NetSalary);

            // count employees in department
            var departments = await _hrGetterService.GetAllDepartments(); 

            var countByDepartment = employees
            .GroupBy(e => e.DepartmentID)
            .Join(departments,
             g => g.Key,
             d => d.DepartmentId,
             (g, d) => new
             {
                 DepartmentName = d.DepartmentName,
                 Count = g.Count()
             });

            return Json(new {countgender = countGender, countemployees = countEmployees, averagesalary = averageSalary, countempindepartment = countByDepartment});
        }
    }
}

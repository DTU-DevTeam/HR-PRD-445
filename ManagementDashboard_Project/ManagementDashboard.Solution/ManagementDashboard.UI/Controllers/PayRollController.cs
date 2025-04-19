using ManagementDashboard.Core.Domain.Entities;
using ManagementDashboard.Core.Enums;
using ManagementDashboard.Core.Services.PayRollServices;
using ManagementDashboard.Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace ManagementDashboard.UI.Controllers
{
    [Route("[Controller]/[action]")]
    public class PayRollController : Controller
    {
        public readonly PayRollGetterService _payRollGetterService;
        public readonly PayRollSorterService _payRollSorterService;

        public PayRollController(PayRollGetterService payRollGetterService, PayRollSorterService payRollSorterService)
        {

            _payRollGetterService = payRollGetterService;
            _payRollSorterService = payRollSorterService;
        }

        
        [HttpGet]
        public async Task<IActionResult> Salaries(string searchBy, string? searchString, string sortBy = nameof(Employee_SqlServer.EmployeeID), SortOrderOptions sortOrderOptions = SortOrderOptions.Ascending)
        {
            List<Salary_MySQL> salaries = _payRollGetterService.GetAllSalaries().Result;

            List<Salary_MySQL> salariesSorter = _payRollSorterService.GetSortedSalaries(salaries, sortBy, sortOrderOptions);

            ViewBag.CurrentSortBy = $"{sortBy}";
            ViewBag.CurrentSortOrder = $"{sortOrderOptions}";

            return View(salariesSorter);
        }
    }
}

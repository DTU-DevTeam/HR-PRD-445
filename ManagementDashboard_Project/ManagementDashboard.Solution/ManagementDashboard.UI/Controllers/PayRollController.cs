using Management.Core.ServiceContracts;
using Management.Core.Services.AuthorizationServices;
using ManagementDashboard.Core.Domain.Entities;
using ManagementDashboard.Core.Enums;
using ManagementDashboard.Core.Services.PayRollServices;
using ManagementDashboard.Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace ManagementDashboard.UI.Controllers
{
    [Route("[Controller]/[action]")]
    public class PayRollController : Controller
    {
        public readonly PayRollGetterService _payRollGetterService;
        public readonly PayRollSorterService _payRollSorterService;

        public AuthorizationService _authorizationService;
        private readonly IJwtService _jwtService;

        public PayRollController(PayRollGetterService payRollGetterService, PayRollSorterService payRollSorterService, IJwtService jwtService, AuthorizationService authorization)
        {

            _payRollGetterService = payRollGetterService;
            _payRollSorterService = payRollSorterService;
            _jwtService = jwtService;
            _authorizationService = authorization;
        }


        [HttpGet]
        public async Task<IActionResult> Salaries(string searchBy, string? searchString, string sortBy = nameof(Salary_MySQL.SalaryID), SortOrderOptions sortOrderOptions = SortOrderOptions.Ascending)
        {
            var token = Request.Cookies["jwt_token"];

            if (string.IsNullOrEmpty(token))
            {
                return RedirectToAction("Unauthorized", "StatusResponse");
            }

            // Xử lý token: xác thực, giải mã, lấy thông tin user...
            var claimsPrincipal = _jwtService.ReadJwtToken(token);

            if (claimsPrincipal == null)
            {
                return RedirectToAction("Unauthorized", "StatusResponse");
            }

            var userId = claimsPrincipal.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;


            Guid useridGuid = Guid.Parse(userId);

            if (!await _authorizationService.AuthorizationUser(useridGuid, Guid.Parse("425b7c04-c5f0-4531-b894-809bfd3b878e")))
            {
                return RedirectToAction("Forbidden", "StatusResponse");
            }


            List<Salary_MySQL> salaries = _payRollGetterService.GetAllSalaries().Result;

            List<Salary_MySQL> salariesSorter = _payRollSorterService.GetSortedSalaries(salaries, sortBy, sortOrderOptions);

            ViewBag.CurrentSortBy = $"{sortBy}";
            ViewBag.CurrentSortOrder = $"{sortOrderOptions}";

            return View(salariesSorter);
        }

        [HttpGet]
        public async Task<IActionResult> Attendance(string searchBy, string? searchString, string sortBy = nameof(Salary_MySQL.SalaryID), SortOrderOptions sortOrderOptions = SortOrderOptions.Ascending)
        {
            var token = Request.Cookies["jwt_token"];

            if (string.IsNullOrEmpty(token))
            {
                return RedirectToAction("Unauthorized", "StatusResponse");
            }

            // Xử lý token: xác thực, giải mã, lấy thông tin user...
            var claimsPrincipal = _jwtService.ReadJwtToken(token);

            if (claimsPrincipal == null)
            {
                return RedirectToAction("Unauthorized", "StatusResponse");
            }

            var userId = claimsPrincipal.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;

            Guid useridGuid = Guid.Parse(userId);

            if (!await _authorizationService.AuthorizationUser(useridGuid, Guid.Parse("425b7c04-c5f0-4531-b894-809bfd3b878e")))
            {
                return RedirectToAction("Forbidden", "StatusResponse");
            }

            List<Attendance_MySql> attendances = await _payRollGetterService.GetAllAttendances();

            List<Attendance_MySql> attendancesSorter = _payRollSorterService.GetSortedAttendances(attendances, sortBy, sortOrderOptions);

            ViewBag.CurrentSortBy = $"{sortBy}";
            ViewBag.CurrentSortOrder = $"{sortOrderOptions}";

            return View(attendancesSorter);

        }

        [HttpGet]
        public async Task<IActionResult> AlertAbsentDays()
        {
          /*  var token = Request.Cookies["jwt_token"];

            if (string.IsNullOrEmpty(token))
            {
                return RedirectToAction("Unauthorized", "StatusResponse");
            }

            // Xử lý token: xác thực, giải mã, lấy thông tin user...
            var claimsPrincipal = _jwtService.ReadJwtToken(token);

            if (claimsPrincipal == null)
            {
                return RedirectToAction("Unauthorized", "StatusResponse");
            }

            var userId = claimsPrincipal.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;

            Guid useridGuid = Guid.Parse(userId);

            if (!await _authorizationService.AuthorizationUser(useridGuid, Guid.Parse("425b7c04-c5f0-4531-b894-809bfd3b878e")))
            {
                return RedirectToAction("Forbidden", "StatusResponse");
            }*/

            List<Attendance_MySql> attendents = await _payRollGetterService.GetAllAttendances();

            List<Attendance_MySql> attendentsMonth = attendents.Where(a => a.AttendanceMonth.Year == DateTime.Now.Year).ToList();

            var totalAbsentByEmployee = attendents
                .GroupBy(a => a.EmployeeID)
                .Select(g => new
                {
                    EmployeeID = g.Key,
                    TotalAbsentDays = g.Sum(a => a.AbsentDays)
                })
                .ToList();

            var alertEmployeeIDs = totalAbsentByEmployee
               .Where(x => x.TotalAbsentDays >= 3)
               .Select(x => x.EmployeeID)
               .ToList();

            
            var alertAbsentDays = totalAbsentByEmployee
                .Where(a => alertEmployeeIDs.Contains(a.EmployeeID))
                .ToList();

            return Json(alertAbsentDays);
        }
    }

}

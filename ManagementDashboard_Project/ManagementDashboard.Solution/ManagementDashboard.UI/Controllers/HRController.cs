using ExcelDataReader;
using Management.Core.Dto.Requests;
using Management.Core.Dto.Responses;
using Management.Core.ServiceContracts;
using Management.Core.Services.AuthorizationServices;
using Management.Core.Services.HRServices;
using ManagementDashboard.Core.Domain.Entities;
using ManagementDashboard.Core.Enums;
using ManagementDashboard.Core.Services.HRServices;
using ManagementDashboard.Infrastructure.Repositories;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using System.Security.Claims;

namespace ManagementDashboard.UI.Controllers
{
    [Route("[Controller]/[action]")]
    public class HRController : Controller
    {
        public readonly HRGetterService _hrGetterService;
        public readonly HRSorterService _hrSorterService;
        public HREditService _hrEditService;
        public HRDeleteService _hrDeleteService;
        public HRAddService _hrAddService;

        public AuthorizationService _authorizationService;

        private readonly IJwtService _jwtService;



        public HRController(HRGetterService hrGetterService, HRSorterService hrSorterService, HREditService hrEditService, HRDeleteService hrDeleteService, HRAddService hrAddService, AuthorizationService authorizationService, IJwtService jwtService)
        {
            _hrGetterService = hrGetterService;
            _hrSorterService = hrSorterService;
            _hrEditService = hrEditService;
            _hrDeleteService = hrDeleteService;
            _hrAddService = hrAddService;
            _authorizationService = authorizationService;
            _jwtService = jwtService;
        }


        [HttpGet]
        public async Task<IActionResult> Employees(string searchBy, string? searchString, string sortBy = nameof(Employee_SqlServer.EmployeeID), SortOrderOptions sortOrderOptions = SortOrderOptions.Ascending)
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

            if (!await _authorizationService.AuthorizationUser(useridGuid, Guid.Parse("6e50879c-d3bf-4d1f-a27f-666a0265e46d")))
            {
                return RedirectToAction("Forbidden", "StatusResponse");
            }



            List<Employee_SqlServer> employees = await _hrGetterService.GetFilteredEmployees(searchBy, searchString);

            // hoSoNhanViens_SqlServer = _hrGetterService.GetAllEmployees().Result;
            List<Employee_SqlServer> hoSoNhanViens_SqlServer = _hrSorterService.GetSortedPersons(employees, sortBy, sortOrderOptions);

            ViewBag.CurrentSortBy = $"{sortBy}";
            ViewBag.CurrentSortOrder = $"{sortOrderOptions}";

            return View(hoSoNhanViens_SqlServer);

        }


        [HttpGet]
        public async Task<IActionResult> AddEmployee()
        {
            var token = Request.Cookies["jwt_token"];

            if (string.IsNullOrEmpty(token))
            {
                return RedirectToAction("Unauthorized", "StatusResponse");
            }

            
            var claimsPrincipal = _jwtService.ReadJwtToken(token);

            if (claimsPrincipal == null)
            {
                return RedirectToAction("Unauthorized", "StatusResponse");
            }

            var userId = claimsPrincipal.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;


            Guid useridGuid = Guid.Parse(userId);

            if (!await _authorizationService.AuthorizationUser(useridGuid, Guid.Parse("6e50879c-d3bf-4d1f-a27f-666a0265e46d")))
            {
                return RedirectToAction("Forbidden", "StatusResponse");
            }




            ViewBag.Departments = await _hrGetterService.GetAllDepartments();
            ViewBag.Positions = await _hrGetterService.GetAllPositions();

            return View();
        }


        [HttpPost]
        public async Task<IActionResult> AddEmployee(AddEmployee_Request request)
        {
            var token = Request.Cookies["jwt_token"];

            if (string.IsNullOrEmpty(token))
            {
                return RedirectToAction("Unauthorized", "StatusResponse");
            }

           
            var claimsPrincipal = _jwtService.ReadJwtToken(token);

            if (claimsPrincipal == null)
            {
                return RedirectToAction("Unauthorized", "StatusResponse");
            }

            var userId = claimsPrincipal.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;


            Guid useridGuid = Guid.Parse(userId);

            if (!await _authorizationService.AuthorizationUser(useridGuid, Guid.Parse("6e50879c-d3bf-4d1f-a27f-666a0265e46d")))
            {
                return RedirectToAction("Forbidden", "StatusResponse");
            }





            if (!ModelState.IsValid)
            {
                ViewBag.Errors = ModelState.Values.SelectMany(temp => temp.Errors).Select(temp => temp.ErrorMessage);
            }

            Employee_SqlServer employee = request.ConvertToEmployee();

            ViewBag.Departments = await _hrGetterService.GetAllDepartments();
            ViewBag.Positions = await _hrGetterService.GetAllPositions();

          
            try
            {
                await _hrAddService.AddEmployee(employee);
            }
            catch (InvalidOperationException ex)
            {

                ViewBag.Errors = ex.Message;

                return View(request);
            }
            catch (Exception ex)
            {

                ViewBag.Errors = ex.Message;

                return View(request);
            }


            ViewBag.Success = "Added successfully!";
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> EditEmployee(string id)
        {
            var token = Request.Cookies["jwt_token"];

            if (string.IsNullOrEmpty(token))
            {
                return RedirectToAction("Unauthorized", "StatusResponse");
            }

           
            var claimsPrincipal = _jwtService.ReadJwtToken(token);

            if (claimsPrincipal == null)
            {
                return RedirectToAction("Unauthorized", "StatusResponse");
            }

            var userId = claimsPrincipal.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;


            Guid useridGuid = Guid.Parse(userId);

            if (!await _authorizationService.AuthorizationUser(useridGuid, Guid.Parse("6e50879c-d3bf-4d1f-a27f-666a0265e46d")))
            {
                return RedirectToAction("Forbidden", "StatusResponse");
            }




            int employeeIdInt = int.Parse(id);

            Employee_SqlServer employee = await _hrGetterService.GetEmployeeById(employeeIdInt);


            EditEmployee_Response editEmployee_Response = employee.ToEditEmployee_Response();

            ViewBag.Employee = editEmployee_Response;
            ViewBag.Departments = await _hrGetterService.GetAllDepartments();
            ViewBag.Positions = await _hrGetterService.GetAllPositions();


            return View();
        }


        [HttpPost]
        public async Task<IActionResult> EditEmployee(EditEmployee_Request editEmployee_Request)
        {
            var token = Request.Cookies["jwt_token"];

            if (string.IsNullOrEmpty(token))
            {
                return RedirectToAction("Unauthorized", "StatusResponse");
            }

            
            var claimsPrincipal = _jwtService.ReadJwtToken(token);

            if (claimsPrincipal == null)
            {
                return RedirectToAction("Unauthorized", "StatusResponse");
            }

            var userId = claimsPrincipal.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;


            Guid useridGuid = Guid.Parse(userId);

            if (!await _authorizationService.AuthorizationUser(useridGuid, Guid.Parse("6e50879c-d3bf-4d1f-a27f-666a0265e46d")))
            {
                return RedirectToAction("Forbidden", "StatusResponse");
            }




            if (!ModelState.IsValid)
            {
                return View();
            }

            Employee_SqlServer employeeConvert = editEmployee_Request.ConvertToEmployee();


            /*  if (editEmployee_Request == null)
              {
                  return NotFound();
              }*/

            try
            {
                Employee_SqlServer employee = await _hrEditService.EditEmployee(employeeConvert);

                //convert to response
                EditEmployee_Response editEmployee_Response = employee.ToEditEmployee_Response();
                ViewBag.Employee = editEmployee_Response;
            }
            catch (InvalidOperationException ex)
            {
                ViewBag.Errors = ex.Message;

                ViewBag.Departments = await _hrGetterService.GetAllDepartments();
                ViewBag.Positions = await _hrGetterService.GetAllPositions();

                return View(editEmployee_Request);
            }
            catch (Exception ex)
            {
                ViewBag.Errors = ex.Message;

                ViewBag.Departments = await _hrGetterService.GetAllDepartments();
                ViewBag.Positions = await _hrGetterService.GetAllPositions();

                return View(editEmployee_Request);
            }

            ViewBag.Departments = await _hrGetterService.GetAllDepartments();
            ViewBag.Positions = await _hrGetterService.GetAllPositions();

            return View();
        }

        [HttpGet]
        public async Task<IActionResult> DeleteEmployee(string id)
        {
            var token = Request.Cookies["jwt_token"];

            if (string.IsNullOrEmpty(token))
            {
                return RedirectToAction("Unauthorized", "StatusResponse");
            }

           
            var claimsPrincipal = _jwtService.ReadJwtToken(token);

            if (claimsPrincipal == null)
            {
                return RedirectToAction("Unauthorized", "StatusResponse");
            }

            var userId = claimsPrincipal.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;


            Guid useridGuid = Guid.Parse(userId);

            if (!await _authorizationService.AuthorizationUser(useridGuid, Guid.Parse("6e50879c-d3bf-4d1f-a27f-666a0265e46d")))
            {
                return RedirectToAction("Forbidden", "StatusResponse");
            }



            int employeeIdInt = int.Parse(id);

            Employee_SqlServer employee = await _hrGetterService.GetEmployeeById(employeeIdInt);

            if (employee == null)
            {
                return NotFound();
            }

            await _hrDeleteService.DeleteEmployee(employeeIdInt);

            return RedirectToAction("Employees", "HR");
        }

        [HttpGet]
        public async Task<IActionResult> DeleteComfirm(string id)
        {
          /*  var token = Request.Cookies["jwt_token"];

            if (string.IsNullOrEmpty(token))
            {
                return RedirectToAction("Unauthorized", "StatusResponse");
            }

           
            var claimsPrincipal = _jwtService.ReadJwtToken(token);

            if (claimsPrincipal == null)
            {
                return RedirectToAction("Unauthorized", "StatusResponse");
            }

            var userId = claimsPrincipal.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;

            Guid useridGuid = Guid.Parse(userId);

            if (!await _authorizationService.AuthorizationUser(useridGuid, Guid.Parse("6e50879c-d3bf-4d1f-a27f-666a0265e46d")))
            {
                return RedirectToAction("Forbidden", "StatusResponse");
            }*/

            ViewBag.EmployeeId = id;

            return View();
        }

        [HttpGet]
        public async Task<IActionResult> ImportExcel()
        {
            var token = Request.Cookies["jwt_token"];

            if (string.IsNullOrEmpty(token))
            {
                return RedirectToAction("Unauthorized", "StatusResponse");
            }

          
            var claimsPrincipal = _jwtService.ReadJwtToken(token);

            if (claimsPrincipal == null)
            {
                return RedirectToAction("Unauthorized", "StatusResponse");
            }

            var userId = claimsPrincipal.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;


            Guid useridGuid = Guid.Parse(userId);

            if (!await _authorizationService.AuthorizationUser(useridGuid, Guid.Parse("6e50879c-d3bf-4d1f-a27f-666a0265e46d")))
            {
                return RedirectToAction("Forbidden", "StatusResponse");
            }

            return View();
        }

        [HttpGet]
        public IActionResult ExcelFileReader()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> ExcelFileReader(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance); 

            var employees_SqlServer = new List<Employee_SqlServer>();

            using (var stream = new MemoryStream())
            {
                await file.CopyToAsync(stream);
                stream.Position = 0;

                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {
                    var result = reader.AsDataSet(new ExcelDataSetConfiguration()
                    {
                        ConfigureDataTable = (_) => new ExcelDataTableConfiguration()
                        {
                            UseHeaderRow = true 
                        }
                    });

                    var table = result.Tables[0]; 

                    foreach (DataRow row in table.Rows)
                    {
                        string dateOfBirthRaw = row["Date Of Birth"].ToString();
                        string hireRaw = row["Hire Date"]?.ToString();

                        DateTime.TryParseExact(
                        dateOfBirthRaw,
                        new[] { "dd/MM/yyyy" },
                        CultureInfo.InvariantCulture,
                        DateTimeStyles.None,
                        out DateTime dateOfBirth);

                        DateTime.TryParseExact(
                        hireRaw,
                        new[] { "dd/MM/yyyy" }, 
                        CultureInfo.InvariantCulture,
                        DateTimeStyles.None,
                        out DateTime hireDate);

                        var employee_SqlServer = new Employee_SqlServer
                        {
                            FullName = row["Full Name"].ToString(),
                            DateOfBirth = dateOfBirth == default ? DateTime.MinValue : dateOfBirth,
                            Gender = row["Gender"].ToString(),
                            PhoneNumber = row["Phone number"].ToString(),
                            Email = row["Email"].ToString(),
                            HireDate = dateOfBirth == default ? DateTime.MinValue : dateOfBirth,
                            DepartmentID = int.TryParse(row["Department ID"].ToString(), out var depId) ? depId : 0,
                            PositionID = int.TryParse(row["Position ID"].ToString(), out var posId) ? posId : 0,
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now,
                            Status = "active"
                        };

                        employees_SqlServer.Add(employee_SqlServer);


                    }
                }
            }

            //so dien thoai trung trong danh sach
            var duplicatePhoneNumbers = employees_SqlServer.GroupBy(x => x.PhoneNumber)
                .Where(g => g.Count() > 1)
                .Select(g => g.Key)
                .ToList();

            //email trung trong danh sach
            var duplicateEmails = employees_SqlServer.GroupBy(x => x.Email)
                .Where(g => g.Count() > 1)
                .Select(g => g.Key)
                .ToList();

            List<Employee_SqlServer> employees = new List<Employee_SqlServer>();
            employees = await _hrGetterService.GetAllEmployees();

            //so sanh ds nhan vien trong excel voi csdl
            var duplicatePhoneIndatabase = employees_SqlServer
    .GroupBy(e => e.PhoneNumber)
    .Where(e => employees.Any(emp => emp.PhoneNumber == e.Key))
    .Select(g => g.Key)
    .ToList();


            var duplicateEmailIndatabase = employees_SqlServer.GroupBy(e => e.Email)
    .Where(e => employees.Any(emp => emp.Email == e.Key))
    .Select(g => g.Key)
    .ToList();

            ViewBag.DuplicatePhoneNumbersInFile = duplicatePhoneNumbers;
            ViewBag.DuplicateEmailsInFile = duplicateEmails;

            ViewBag.DuplicatePhoneNumbersInDatabase = duplicatePhoneIndatabase;
            ViewBag.DuplicateEmailsInDatabase = duplicateEmailIndatabase;


            // await _hrAddService.AddEmployeesByExcel(employees_SqlServer);

            ViewBag.Employees = employees_SqlServer;


            return View();


        }

        [HttpPost]
        public async Task<IActionResult> ImportExcelIntoDatabase(List<Employee_SqlServer> employees_SqlServer)
        {
            if (employees_SqlServer == null || !employees_SqlServer.Any())
            {
                return BadRequest("No data to import.");
            }

            
            try
            {
                await _hrAddService.AddEmployeesByExcel(employees_SqlServer);
            }
            catch (InvalidOperationException ex)
            {
                ModelState.AddModelError("Error", ex.Message);
                return View();
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", "An error occurred while adding the employee.");
                return View();
            }

            //TempData["SuccessMessage"] = "Employees imported successfully.";

            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> Departments()
        {
            var token = Request.Cookies["jwt_token"];

            if (string.IsNullOrEmpty(token))
            {
                return RedirectToAction("Unauthorized", "StatusResponse");
            }

          
            var claimsPrincipal = _jwtService.ReadJwtToken(token);

            if (claimsPrincipal == null)
            {
                return RedirectToAction("Unauthorized", "StatusResponse");
            }

            var userId = claimsPrincipal.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;


            Guid useridGuid = Guid.Parse(userId);

            if (!await _authorizationService.AuthorizationUser(useridGuid, Guid.Parse("6e50879c-d3bf-4d1f-a27f-666a0265e46d")))
            {
                return RedirectToAction("Forbidden", "StatusResponse");
            }


            List<Department_SqlServer> departments = await _hrGetterService.GetAllDepartments();



            return View(departments);
        }

        [HttpGet]
        public async Task<IActionResult> Positions()
        {
            var token = Request.Cookies["jwt_token"];

            if (string.IsNullOrEmpty(token))
            {
                return RedirectToAction("Unauthorized", "StatusResponse");
            }

            
            var claimsPrincipal = _jwtService.ReadJwtToken(token);

            if (claimsPrincipal == null)
            {
                return RedirectToAction("Unauthorized", "StatusResponse");
            }

            var userId = claimsPrincipal.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;

            List<Position_SqlServer> positions = await _hrGetterService.GetAllPositions();

            return View(positions);
        }


    }
}

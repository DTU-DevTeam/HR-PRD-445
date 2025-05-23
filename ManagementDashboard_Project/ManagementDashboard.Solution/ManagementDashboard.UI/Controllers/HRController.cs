﻿using ManagementDashboard.Core.Domain.Entities;
using ManagementDashboard.Core.Dto;
using ManagementDashboard.Core.Enums;
using ManagementDashboard.Core.Services.HRServices;
using ManagementDashboard.Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ManagementDashboard.UI.Controllers
{
    [Route("[Controller]/[action]")]
    public class HRController : Controller
    {
        public readonly HRGetterService _hrGetterService;
        public readonly HRSorterService _hrSorterService;
       

        public HRController(HRGetterService hrGetterService, HRSorterService hrSorterService)
        {
            _hrGetterService = hrGetterService;
            _hrSorterService = hrSorterService;
           
        }

        
        [HttpGet]
        public async Task<IActionResult> Employees(string searchBy, string? searchString, string sortBy = nameof(Employee_SqlServer.EmployeeID), SortOrderOptions sortOrderOptions = SortOrderOptions.Ascending)
        {
            List<Employee_SqlServer> hoSoNhanViens_SqlServer = _hrGetterService.GetAllEmployees().Result;


            hoSoNhanViens_SqlServer = _hrSorterService.GetSortedPersons(hoSoNhanViens_SqlServer, sortBy, sortOrderOptions);

            ViewBag.CurrentSortBy = $"{sortBy}";
            ViewBag.CurrentSortOrder = $"{sortOrderOptions}";

            return View(hoSoNhanViens_SqlServer);

        }
        
       
 /*       [HttpGet]
        public IActionResult AddEmployee()
        {
            //get departments
            List<Department_SqlServer> department_SqlServers = _DepartmentsRepository.GetAll().Result;

            ViewBag.Departments = department_SqlServers;

            return View();
        }
/*
        
        [HttpPost]
        public async Task<IActionResult> AddEmployee(AddEmployee_Request request)
        {
            if (!ModelState.IsValid)
            {
               
            }

            Employee_SqlServer employee = new Employee_SqlServer
            {
                
                Status = "Active"

            };



            await _EmployeeRepository.AddEmployee_SqlServer(employee);
            await _EmployeeRepository._dbcontext_SqlServer.SaveChangesAsync();

            //Đồng bộ dữ liệu vói employees trong  PayRoll database (MySQL)

           /* var employee_SqlServer =  _EmployeeRepository._dbcontext_SqlServer.Employees.Where(x => x.ApplicantID == request.ApplicantID);
            Employee_SqlServer? employee_SqlServer1 = await employee_SqlServer.FirstOrDefaultAsync(x => x.DepartmentID == request.DepartmentID);

            if (employee_SqlServer1 == null) {
                return View();
            }


          //  Applicant_SqlServer? applicant_SqlServer = await _ApplicantsRepository._dbcontext.Applicants.FindAsync(request.ApplicantID);
            

          /*  Employee_MySql employee_MySql = new Employee_MySql
            {
                Employee_ID = employee_SqlServer1.EmployeeID,
                First_Name = applicant_SqlServer.FirstName,
                Last_Name = applicant_SqlServer.LastName,
                Hire_Date = employee_SqlServer1.HireDate,
                Email = applicant_SqlServer.Email,
                Phone = applicant_SqlServer.Phone,
                Department_ID = employee_SqlServer1.DepartmentID,
                Job_ID = applicant_SqlServer.JobID,
                Salary = employee_SqlServer1.Salary,
                Status = "active"


            };

          //  await _EmployeeRepository.AddEmployee_MySql(employee_MySql);




            return RedirectToAction("Employees", "HR");
        }

        [HttpGet]
        public async Task<IActionResult> EditEmployee(string id)
        {
            int employeeIdInt = int.Parse(id);

            Employee_SqlServer employee = await _EmployeeRepository.GetEmployeeById_SqlServer(employeeIdInt);
            ViewBag.Employees = employee;

            //get departments
            List<Department_SqlServer> department_SqlServers = _DepartmentsRepository.GetAll().Result;

            ViewBag.Departments = department_SqlServers;


            return View();
        }

        //[HttpPut("{id:int}")]
        [HttpPost]
        public async Task<IActionResult> EditEmployee(EditEmployee_Request editEmployee_Request)
        {
            if(!ModelState.IsValid)
            {
               // return View();
            }

            Employee_SqlServer? employee = await _EmployeeRepository._dbcontext_SqlServer.Employees.FirstOrDefaultAsync(x => x.EmployeeID == editEmployee_Request.EmployeeID);

            if(employee == null)
            {
                return NotFound();
            }

         /*   employee.DepartmentID = editEmployee_Request.DepartmentID;
            employee.ApplicantID = editEmployee_Request.ApplicantID;
            employee.HireDate = editEmployee_Request.HireDate;
            employee.Salary = editEmployee_Request.Salary;

            await _EmployeeRepository.EditEmployee_SqlServer(employee);
            // await _EmployeeRepository._dbcontext_SqlServer.SaveChangesAsync();


            return RedirectToAction("Employees", "HR");
        }

        //[HttpDelete]
        public async Task<IActionResult> DeleteEmployee(string id)
        {
            int employeeIdInt = int.Parse(id);

            Employee_SqlServer employee = await _EmployeeRepository.GetEmployeeById_SqlServer(employeeIdInt);

            if(employee == null)
            {
                return NotFound();
            }

            await _EmployeeRepository.DeleteEmployeeById_SqlServer(employeeIdInt);

            return RedirectToAction("Employees", "HR");
        }
*/
    }
}

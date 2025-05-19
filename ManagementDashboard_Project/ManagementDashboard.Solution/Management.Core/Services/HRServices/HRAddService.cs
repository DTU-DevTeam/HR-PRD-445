using ManagementDashboard.Core.Domain.Entities;
using ManagementDashboard.Core.RepositoryContract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Management.Core.Services.HRServices
{
    public class HRAddService
    {
        public IEmployeesRepository _employeesRepository;


        public HRAddService(IEmployeesRepository employeesRepository)
        {
            _employeesRepository = employeesRepository;
        }

        // Method to add employees by Excel
        public async Task<List<Employee_SqlServer>> AddEmployeesByExcel(List<Employee_SqlServer> employees_SqlServer)
        {
            if (employees_SqlServer == null || employees_SqlServer.Count == 0)
            {
                throw new ArgumentNullException(nameof(employees_SqlServer));
            }

            List<Employee_SqlServer> existingEmployees = await _employeesRepository.GetAllEmployees();

            foreach (var employee in employees_SqlServer)
            {
                if (existingEmployees.Any(x => x.Email == employee.Email))
                {
                    throw new InvalidOperationException($"Email {employee.Email} already exists");
                }

                if (existingEmployees.Any(x => x.PhoneNumber == employee.PhoneNumber))
                {
                    throw new InvalidOperationException($"Phone number {employee.PhoneNumber} already exists");
                }
            }

            return await _employeesRepository.AddEmployeesByExcel(employees_SqlServer);

        }

        // Method to add an employee
        public async Task<Employee_SqlServer> AddEmployee(Employee_SqlServer employee_SqlServer)
        {
            if(employee_SqlServer == null)
            {
                throw new ArgumentNullException(nameof(employee_SqlServer));
            }

            List<Employee_SqlServer> employees = await _employeesRepository.GetAllEmployees();

            if (employees.Where(x=> x.Email == employee_SqlServer.Email).FirstOrDefault() != null)
            {
                throw new InvalidOperationException("Email already exists");
            }

            if (employees.Where(x=> x.PhoneNumber == employee_SqlServer.PhoneNumber).FirstOrDefault() != null)
            {
                throw new InvalidOperationException("Phone already exists");
            }

            employee_SqlServer.Status = "active";
            employee_SqlServer.CreatedAt = DateTime.Now;
            employee_SqlServer.UpdatedAt = DateTime.Now;

            return await _employeesRepository.AddEmployee(employee_SqlServer);
        }

        
    }
}

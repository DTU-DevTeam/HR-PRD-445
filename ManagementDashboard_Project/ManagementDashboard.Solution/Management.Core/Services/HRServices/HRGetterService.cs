using Management.Core.RepositoryContract;
using ManagementDashboard.Core.Domain.Entities;
using ManagementDashboard.Core.RepositoryContract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementDashboard.Core.Services.HRServices
{
    public class HRGetterService
    {
        private readonly IEmployeesRepository _employeesRepository;
        private readonly IDepartmentsRepository _departmentsRepository;

        public HRGetterService(IEmployeesRepository employeesRepository, IDepartmentsRepository departmentsRepository)
        {
            _employeesRepository = employeesRepository;
            _departmentsRepository = departmentsRepository;
        }

        public async Task<List<Employee_SqlServer>> GetAllEmployees()
        {
            return await _employeesRepository.GetAllEmployees();
        }

        public async Task<List<Department_SqlServer>> GetAllDepartments()
        {
            return await _departmentsRepository.GetAllDepartments();
        }

        public async Task<List<Position_SqlServer>> GetAllPositions()
        {
            return await _employeesRepository.GetAllPositions();
        }

        public async Task<Employee_SqlServer> GetEmployeeById(int id)
		{
			return await _employeesRepository.GetEmployeeById_SqlServer(id);
		}

        public virtual async Task<List<Employee_SqlServer>> GetFilteredEmployees(string searchBy, string? searchString)
        {
            if (string.IsNullOrWhiteSpace(searchString))
            {
                return await _employeesRepository.GetAllEmployees();
            }

            List<Employee_SqlServer> persons;

           
                persons = searchBy switch
                {
                    nameof(Employee_SqlServer.EmployeeID) =>
                     await _employeesRepository.GetFilteredEmployees(temp =>
                     temp.EmployeeID.ToString().Contains(searchString)),

                    nameof(Employee_SqlServer.FullName) =>
                     await _employeesRepository.GetFilteredEmployees(temp =>
                     temp.FullName.Contains(searchString)),

                    nameof(Employee_SqlServer.Email) =>
                     await _employeesRepository.GetFilteredEmployees(temp =>
                     temp.Email.Contains(searchString)),

                    nameof(Employee_SqlServer.DateOfBirth) =>
                     await _employeesRepository.GetFilteredEmployees(temp => temp.DateOfBirth.HasValue &&
                     temp.DateOfBirth.Value.ToString("dd/MM/yyyy").Contains(searchString)),


                    nameof(Employee_SqlServer.Gender) =>
                     await _employeesRepository.GetFilteredEmployees(temp =>
                     temp.Gender.Contains(searchString)),

                    nameof(Employee_SqlServer.HireDate) =>
                     await _employeesRepository.GetFilteredEmployees(temp => temp.DateOfBirth.HasValue &&
                     temp.HireDate.Value.ToString("dd/MM/yyyy").Contains(searchString)),

                    nameof(Employee_SqlServer.DepartmentID) =>
                     await _employeesRepository.GetFilteredEmployees(temp =>
                     temp.DepartmentID.ToString().Contains(searchString)),

                    nameof(Employee_SqlServer.PositionID) =>
                    await _employeesRepository.GetFilteredEmployees(temp =>
                    temp.PositionID.ToString().Contains(searchString)),

                    _ => await _employeesRepository.GetAllEmployees()
                };
           
            

            return persons;
        }

    }
}

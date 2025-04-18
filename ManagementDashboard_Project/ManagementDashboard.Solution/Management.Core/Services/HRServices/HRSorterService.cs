using ManagementDashboard.Core.Domain.Entities;
using ManagementDashboard.Core.Enums;
using ManagementDashboard.Core.RepositoryContract;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementDashboard.Core.Services.HRServices
{
    public class HRSorterService
    {
        private readonly IEmployeesRepository _employeesRepository;

        public HRSorterService(IEmployeesRepository employeesRepository)
        {
            _employeesRepository = employeesRepository;
        }

        public List<Employee_SqlServer> GetSortedPersons(List<Employee_SqlServer> employees, string sortBy, SortOrderOptions sortOrder)
        {

            if (string.IsNullOrEmpty(sortBy))
                return employees;

            List<Employee_SqlServer> sortedPersons = (sortBy, sortOrder) switch
            {
                (nameof(Employee_SqlServer.EmployeeID), SortOrderOptions.Ascending) => employees.OrderBy(temp => temp.EmployeeID).ToList(),

                (nameof(Employee_SqlServer.EmployeeID), SortOrderOptions.Descending) => employees.OrderByDescending(temp => temp.EmployeeID).ToList(),

                (nameof(Employee_SqlServer.FullName), SortOrderOptions.Ascending) => employees.OrderBy(temp => temp.FullName, StringComparer.OrdinalIgnoreCase).ToList(),

                (nameof(Employee_SqlServer.FullName), SortOrderOptions.Descending) => employees.OrderByDescending(temp => temp.FullName, StringComparer.OrdinalIgnoreCase).ToList(),

                (nameof(Employee_SqlServer.Gender), SortOrderOptions.Ascending) => employees.OrderBy(temp => temp.Gender, StringComparer.OrdinalIgnoreCase).ToList(),

                (nameof(Employee_SqlServer.Gender), SortOrderOptions.Descending) => employees.OrderByDescending(temp => temp.Gender, StringComparer.OrdinalIgnoreCase).ToList(),

                (nameof(Employee_SqlServer.Email), SortOrderOptions.Ascending) => employees.OrderBy(temp => temp.Email, StringComparer.OrdinalIgnoreCase).ToList(),

                (nameof(Employee_SqlServer.Email), SortOrderOptions.Descending) => employees.OrderByDescending(temp => temp.Email, StringComparer.OrdinalIgnoreCase).ToList(),

                (nameof(Employee_SqlServer.DateOfBirth), SortOrderOptions.Ascending) => employees.OrderBy(temp => temp.DateOfBirth).ToList(),

                (nameof(Employee_SqlServer.DateOfBirth), SortOrderOptions.Descending) => employees.OrderByDescending(temp => temp.DateOfBirth).ToList(),

                (nameof(Employee_SqlServer.HireDate), SortOrderOptions.Ascending) => employees.OrderBy(temp => temp.HireDate).ToList(),

                (nameof(Employee_SqlServer.HireDate), SortOrderOptions.Descending) => employees.OrderByDescending(temp => temp.HireDate).ToList(),

                (nameof(Employee_SqlServer.DepartmentID), SortOrderOptions.Ascending) => employees.OrderBy(temp => temp.DepartmentID).ToList(),

                (nameof(Employee_SqlServer.DepartmentID), SortOrderOptions.Descending) => employees.OrderByDescending(temp => temp.DepartmentID).ToList(),

                (nameof(Employee_SqlServer.PositionID), SortOrderOptions.Ascending) => employees.OrderBy(temp => temp.PositionID).ToList(),

                (nameof(Employee_SqlServer.PositionID), SortOrderOptions.Descending) => employees.OrderByDescending(temp => temp.PositionID).ToList(),

                (nameof(Employee_SqlServer.CreatedAt), SortOrderOptions.Ascending) => employees.OrderBy(temp => temp.CreatedAt).ToList(),

                (nameof(Employee_SqlServer.CreatedAt), SortOrderOptions.Descending) => employees.OrderByDescending(temp => temp.CreatedAt).ToList(),

                (nameof(Employee_SqlServer.UpdatedAt), SortOrderOptions.Ascending) => employees.OrderBy(temp => temp.UpdatedAt).ToList(),

                (nameof(Employee_SqlServer.UpdatedAt), SortOrderOptions.Descending) => employees.OrderByDescending(temp => temp.UpdatedAt).ToList(),



                _ => employees
            };

            return sortedPersons;
        }
    }
}

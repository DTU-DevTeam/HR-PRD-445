using ManagementDashboard.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace ManagementDashboard.Core.RepositoryContract
{
    public interface IEmployeesRepository
    {
        Task<List<Employee_SqlServer>> GetAllEmployees();
        Task<Employee_SqlServer> EditEmployee(Employee_SqlServer employee_SqlServer);
        Task<Employee_SqlServer> GetEmployeeById_SqlServer(int id);

        Task<Employee_SqlServer> DeleteEmployee(int id);

        Task<List<Employee_SqlServer>> AddEmployeesByExcel(List<Employee_SqlServer> employees_SqlServer);

        Task<Employee_SqlServer> AddEmployee(Employee_SqlServer employee_SqlServer);

       

        Task<List<Position_SqlServer>> GetAllPositions();

        Task<List<Employee_SqlServer>> GetFilteredEmployees(Expression<Func<Employee_SqlServer, bool>> predicate);

    }
}

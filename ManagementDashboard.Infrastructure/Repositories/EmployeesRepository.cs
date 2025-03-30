using ManagementDashboard.Core.Domain.Entities;
using ManagementDashboard.Infrastructure.DatabaseContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementDashboard.Infrastructure.Repositories
{
    public class EmployeesRepository
    {
        public ApplicationDbContext_SqlServer _dbcontext_SqlServer;
        public ApplicationDbContext_MySql _dbcontext_MySql;

        public EmployeesRepository(ApplicationDbContext_SqlServer dbContext_SqlServer, ApplicationDbContext_MySql dbContext_MySql)
        {
          _dbcontext_SqlServer = dbContext_SqlServer;
           _dbcontext_MySql = dbContext_MySql;
        }


        /*
         * Get All Employees from SQL Server
         */
        public async Task<List<Employee_SqlServer>> GetAll_SqlServer()
        {
            return await _dbcontext_SqlServer.Employees.ToListAsync();
        }
        // End 
       

        /*
         * Add Employee to database
         */
        public async Task<Employee_SqlServer> AddEmployee_SqlServer(Employee_SqlServer employee_SqlServer)
        {
            await _dbcontext_SqlServer.Employees.AddAsync(employee_SqlServer);

            _dbcontext_SqlServer.SaveChanges();

            return employee_SqlServer;
        }

        public async Task<Employee_MySql> AddEmployee_MySql(Employee_MySql employee_MySql)
        {
            await _dbcontext_MySql.Employees.AddAsync(employee_MySql);

            _dbcontext_MySql.SaveChanges();

            return employee_MySql;
        }
        /*
         * End
         */

        public async Task<Employee_SqlServer> GetEmployeeById_SqlServer(int id)
        {
            return await _dbcontext_SqlServer.Employees.FindAsync(id);
        }

        public async Task<Employee_SqlServer> EditEmployee_SqlServer(Employee_SqlServer employee_SqlServer)
        {
            _dbcontext_SqlServer.Employees.Update(employee_SqlServer);

            _dbcontext_SqlServer.SaveChanges();

            return employee_SqlServer;
        }

        public async Task<Employee_SqlServer> DeleteEmployeeById_SqlServer(int id)
        {
            Employee_SqlServer? employee = await _dbcontext_SqlServer.Employees.FindAsync(id);

            if (employee == null)
            {
                return null;
            }

            _dbcontext_SqlServer.Employees.Remove(employee);

            _dbcontext_SqlServer.SaveChanges();

            return employee;
        }


    }
}

using ManagementDashboard.Core.Domain.Entities;
using ManagementDashboard.Core.RepositoryContract;
using ManagementDashboard.Infrastructure.DatabaseContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ManagementDashboard.Infrastructure.Repositories
{
    public class EmployeesRepository : IEmployeesRepository
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
        private async Task<List<Employee_SqlServer>> GetAll_SqlServer()
        {
            return await _dbcontext_SqlServer.Employees.ToListAsync();
        }

        private async Task<List<Employee_MySql>> GetAll_MySql()
        {
            return await _dbcontext_MySql.Employees.ToListAsync();
        }

        public async Task<List<Employee_SqlServer>> GetAllEmployees()
        {
            List<Employee_MySql> employees_MySql = await GetAll_MySql();
            List<Employee_SqlServer> employees_SqlServer = await GetAll_SqlServer();

            List<Employee_SqlServer> employees = employees_SqlServer
           .Where(sqlEmp => employees_SqlServer
           .Any(myEmp => myEmp.EmployeeID == sqlEmp.EmployeeID))
           .ToList();

            return employees;
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

        public async Task<Employee_SqlServer> AddEmployee(Employee_SqlServer employee_SqlServer)
        {
            await AddEmployee_SqlServer(employee_SqlServer);

            Employee_MySql employee_MySql = new Employee_MySql
            {
                EmployeeID = employee_SqlServer.EmployeeID,
                FullName = employee_SqlServer.FullName,
                DepartmentID = employee_SqlServer.DepartmentID,
                PositionID = employee_SqlServer.PositionID
            };

            await AddEmployee_MySql(employee_MySql);

            return employee_SqlServer;
        }
        /*
         * End
         */

        public async Task<Employee_SqlServer> GetEmployeeById_SqlServer(int id)
        {
            return await _dbcontext_SqlServer.Employees.FindAsync(id);
        }

        public async Task<Employee_MySql> GetEmployeeById_MySql(int id)
        {
            return await _dbcontext_MySql.Employees.FindAsync(id);
        }

        public async Task<Employee_SqlServer> EditEmployee(Employee_SqlServer employee_SqlServer)
        {
            _dbcontext_SqlServer.Employees.Update(employee_SqlServer);

            //edit employee_MySql
            Employee_MySql employee_MySql = await GetEmployeeById_MySql(employee_SqlServer.EmployeeID);

            employee_MySql.FullName = employee_SqlServer.FullName;
            employee_MySql.DepartmentID = employee_SqlServer.DepartmentID;
            employee_MySql.PositionID = employee_SqlServer.PositionID;

            _dbcontext_MySql.Employees.Update(employee_MySql);

            //



            await _dbcontext_SqlServer.SaveChangesAsync();
            await _dbcontext_MySql.SaveChangesAsync();

            return employee_SqlServer;
        }


        /// <summary>
        /// Delete Employee by ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>



        public async Task<Employee_SqlServer> DeleteEmployee(int id)
        {
            Employee_SqlServer? employee_SqlServer = await _dbcontext_SqlServer.Employees.FindAsync(id);
            Employee_MySql? employee_MySql = await _dbcontext_MySql.Employees.FindAsync(id);

            if (employee_SqlServer == null || employee_MySql == null)
            {
                return null;
            }

            _dbcontext_SqlServer.Employees.Remove(employee_SqlServer);
            _dbcontext_MySql.Employees.Remove(employee_MySql);

            _dbcontext_SqlServer.SaveChanges();
            _dbcontext_MySql.SaveChanges();

            return employee_SqlServer;
        }

        public async Task<List<Employee_SqlServer>> AddEmployeesByExcel(List<Employee_SqlServer> employees_SqlServer)
        {
            _dbcontext_SqlServer.Employees.AddRange(employees_SqlServer);

            await _dbcontext_SqlServer.SaveChangesAsync();

            List<Employee_MySql> employees_MySql = new List<Employee_MySql>();

            foreach (var employee_SqlServer in employees_SqlServer)
            {
                Employee_MySql employee = new Employee_MySql
                {
                    EmployeeID = employee_SqlServer.EmployeeID,
                    FullName = employee_SqlServer.FullName,
                    DepartmentID = employee_SqlServer.DepartmentID,
                    PositionID = employee_SqlServer.PositionID
                };

                employees_MySql.Add(employee);
            }


            await AddEmployeesByExcel_SyncEmployee_MySql(employees_MySql);


            return employees_SqlServer;
        }

        private async Task<bool> AddEmployeesByExcel_SyncEmployee_MySql(List<Employee_MySql> employees_MySql)
        {
           // List<Employee_SqlServer> employees_SqlServer = await GetAll_SqlServer();

           

            _dbcontext_MySql.Employees.AddRange(employees_MySql);
            await _dbcontext_MySql.SaveChangesAsync();

            return true;
        }

        

        //get all position
        private async Task<List<Position_SqlServer>> GetAllPositions_SqlServer()
        {
            return await _dbcontext_SqlServer.Positions.ToListAsync();
        }

        private async Task<List<Position_MySql>> GetAllPositions_MySql()
        {
            return await _dbcontext_MySql.Positions.ToListAsync();
        }

        public async Task<List<Position_SqlServer>> GetAllPositions()
        {
            List<Position_SqlServer> positions_SqlServer = await GetAllPositions_SqlServer();
            List<Position_MySql> positions_MySql = await GetAllPositions_MySql();

            List<Position_SqlServer> positions = positions_SqlServer
           .Where(sqlEmp => positions_SqlServer
           .Any(myEmp => myEmp.PositionID == sqlEmp.PositionID))
           .ToList();

            return positions;
        }

        public async Task<List<Employee_SqlServer>> GetFilteredEmployees(Expression<Func<Employee_SqlServer, bool>> predicate)
        {
            return await _dbcontext_SqlServer.Employees.Where(predicate).ToListAsync();
        }
    }
}

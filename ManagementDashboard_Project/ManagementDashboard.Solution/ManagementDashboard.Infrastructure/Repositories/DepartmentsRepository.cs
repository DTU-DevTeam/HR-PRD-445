using Management.Core.RepositoryContract;
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
    public class DepartmentsRepository : IDepartmentsRepository
    {
        public ApplicationDbContext_SqlServer _dbcontext_SqlServer;
        public ApplicationDbContext_MySql _dbcontext_MySql;

        public DepartmentsRepository(ApplicationDbContext_SqlServer dbContext_SqlServer, ApplicationDbContext_MySql dbContext_MySql)
        {
            _dbcontext_SqlServer = dbContext_SqlServer;
            _dbcontext_MySql = dbContext_MySql;
        }

        //get all department

        private async Task<List<Department_SqlServer>> GetAllDepartments_SqlServer()
        {
            return await _dbcontext_SqlServer.Departments.ToListAsync();
        }

        private async Task<List<Department_MySql>> GetAllDepartments_MySql()
        {
            return await _dbcontext_MySql.Departments.ToListAsync();
        }

        public async Task<List<Department_SqlServer>> GetAllDepartments()
        {
            List<Department_SqlServer> departments_SqlServer = await GetAllDepartments_SqlServer();
            List<Department_MySql> departments_MySql = await GetAllDepartments_MySql();

            List<Department_SqlServer> departments = departments_SqlServer
           .Where(sqlEmp => departments_SqlServer
           .Any(myEmp => myEmp.DepartmentId == sqlEmp.DepartmentId))
           .ToList();

            return departments;
        }

        //end 
    }
}

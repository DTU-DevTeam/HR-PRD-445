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
    public class DepartmentsRepository
    {
        public ApplicationDbContext_SqlServer _dbcontext;

        public DepartmentsRepository(ApplicationDbContext_SqlServer dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public async Task<List<Department_SqlServer>> GetAll()
        {
            return await _dbcontext.Departments.ToListAsync();
        }
    }
}

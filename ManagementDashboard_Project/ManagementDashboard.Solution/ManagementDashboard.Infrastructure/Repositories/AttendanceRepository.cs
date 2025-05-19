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
    public class AttendanceRepository : IAttendanceRepository
    {
        public ApplicationDbContext_MySql _dbcontext_MySql;

        public AttendanceRepository(ApplicationDbContext_MySql dbContext_MySql)
        {
            _dbcontext_MySql = dbContext_MySql;
        }

        public async Task<List<Attendance_MySql>> GetAllAttendances()
        {
            return await _dbcontext_MySql.Attendance.ToListAsync();
        }
    }
}

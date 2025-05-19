using ManagementDashboard.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Management.Core.RepositoryContract
{
    public interface IAttendanceRepository
    {
        Task<List<Attendance_MySql>> GetAllAttendances();
    }
}

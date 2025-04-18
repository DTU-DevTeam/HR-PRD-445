using ManagementDashboard.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementDashboard.Core.RepositoryContract
{
    public interface IPayRollRepository
    {
        Task<List<Salary_MySQL>> GetAllSalaries();
    }
}

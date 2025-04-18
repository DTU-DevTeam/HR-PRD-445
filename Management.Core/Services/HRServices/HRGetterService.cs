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

        public HRGetterService(IEmployeesRepository employeesRepository)
        {
            _employeesRepository = employeesRepository;
        }

        public async Task<List<Employee_SqlServer>> GetAllEmployees()
        {
            return await _employeesRepository.GetAllEmployees();
        }

    }
}

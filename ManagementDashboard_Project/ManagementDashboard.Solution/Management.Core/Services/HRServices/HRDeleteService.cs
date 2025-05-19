using ManagementDashboard.Core.RepositoryContract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Management.Core.Services.HRServices
{
    public class HRDeleteService
    {
        public IEmployeesRepository _employeesRepository;

        public HRDeleteService(IEmployeesRepository employeesRepository)
        {
            _employeesRepository = employeesRepository;
        }

        public async Task<bool> DeleteEmployee(int id)
        {
            
            await _employeesRepository.DeleteEmployee(id);
            return true;
        }
    }
}

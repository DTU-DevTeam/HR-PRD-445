using ManagementDashboard.Core.Domain.Entities;
using ManagementDashboard.Core.RepositoryContract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Management.Core.Services.HRServices
{
	public class HREditService
	{
		public IEmployeesRepository _employeesRepository;

		public HREditService(IEmployeesRepository employeesRepository)
		{
			_employeesRepository = employeesRepository;
		}

		public async Task<Employee_SqlServer> EditEmployee(Employee_SqlServer employee_SqlServer)
		{
            if (employee_SqlServer == null)
            {
                throw new ArgumentNullException(nameof(employee_SqlServer));
            }

            employee_SqlServer.UpdatedAt = DateTime.Now;
			await _employeesRepository.EditEmployee(employee_SqlServer);
			return employee_SqlServer;
		}
	}
}

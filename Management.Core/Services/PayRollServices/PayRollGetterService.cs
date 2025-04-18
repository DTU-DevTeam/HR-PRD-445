using ManagementDashboard.Core.Domain.Entities;
using ManagementDashboard.Core.RepositoryContract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementDashboard.Core.Services.PayRollServices
{
    public class PayRollGetterService
    {
        private readonly IPayRollRepository _payRollRepository;

        public PayRollGetterService(IPayRollRepository payRollRepository)
        {
            _payRollRepository = payRollRepository;
        }

        public async Task<List<Salary_MySQL>> GetAllSalaries()
        {
            return await _payRollRepository.GetAllSalaries();
        }

    }
}

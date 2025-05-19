using Management.Core.RepositoryContract;
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
        private readonly IAttendanceRepository _attendanceRepository;

        public PayRollGetterService(IPayRollRepository payRollRepository, IAttendanceRepository attendanceRepository)
        {
            _payRollRepository = payRollRepository;
            _attendanceRepository = attendanceRepository;
        }

        public async Task<List<Salary_MySQL>> GetAllSalaries()
        {
            return await _payRollRepository.GetAllSalaries();
        }

        public async Task<List<Attendance_MySql>> GetAllAttendances()
        {
            return await _attendanceRepository.GetAllAttendances();
        }

    }
}

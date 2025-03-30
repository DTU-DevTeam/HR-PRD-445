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
    public class PayRollRepository
    {
        public readonly ApplicationDbContext_MySql _dbcontext;

        public PayRollRepository(ApplicationDbContext_MySql dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public async Task<List<PayRoll_MySQL>> GetAll()
        {
            return await _dbcontext.PayRolls.ToListAsync();
        }

        public async Task<PayRoll_MySQL> AddPayRoll(PayRoll_MySQL payRoll_MySQL)
        {
            await _dbcontext.PayRolls.AddAsync(payRoll_MySQL);

            _dbcontext.SaveChanges();

            return payRoll_MySQL;
        }
    }
}

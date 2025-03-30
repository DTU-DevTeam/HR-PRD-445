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
    public class ApplicantsRepository
    {
       public ApplicationDbContext_SqlServer _dbcontext;
      
       public ApplicantsRepository(ApplicationDbContext_SqlServer dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public async Task<List<Applicant_SqlServer>> GetAll()
        {
            return await _dbcontext.Applicants.ToListAsync();
        }


    }
}

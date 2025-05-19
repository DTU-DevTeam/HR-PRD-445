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
    public class PositionsRepository : IPositionsRepository
    {
        public ApplicationDbContext_SqlServer _dbcontext_SqlServer;
        public ApplicationDbContext_MySql _dbcontext_MySql;

        public PositionsRepository(ApplicationDbContext_SqlServer dbContext_SqlServer, ApplicationDbContext_MySql dbContext_MySql)
        {
            _dbcontext_SqlServer = dbContext_SqlServer;
            _dbcontext_MySql = dbContext_MySql;
        }

        public async Task<List<Position_SqlServer>> GetAllPositions()
        {
            return await _dbcontext_SqlServer.Positions.ToListAsync();
        }
    }
}

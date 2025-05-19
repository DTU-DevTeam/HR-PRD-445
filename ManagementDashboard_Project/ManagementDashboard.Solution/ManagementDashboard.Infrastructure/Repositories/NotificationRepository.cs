using Management.Core.Domain.Entities.Data_Event;
using Management.Core.RepositoryContract;
using ManagementDashboard.Infrastructure.DatabaseContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementDashboard.Infrastructure.Repositories
{
    public class NotificationRepository : INotificationRepository
    {
        public ApplicationDbContext_ManagementSystem _dbcontext_ManagementSystem;

        public NotificationRepository(ApplicationDbContext_ManagementSystem dbContext_ManagementSystem)
        {
            _dbcontext_ManagementSystem = dbContext_ManagementSystem;
        }

        public async Task<List<Event>> GetAllNotifications()
        {
            return await _dbcontext_ManagementSystem.Events.ToListAsync();
        }
    }
}

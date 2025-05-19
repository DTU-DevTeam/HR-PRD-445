using Management.Core.Domain.Entities.Data_Event;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Management.Core.RepositoryContract
{
    public interface INotificationRepository
    {
        Task<List<Event>> GetAllNotifications();
    }
}

using Management.Core.Domain.Entities.Data_Event;
using Management.Core.RepositoryContract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Management.Core.Services.NotificationServices
{
    public class NotificationGetterService
    {
        public readonly INotificationRepository _notificationRepository;

        public NotificationGetterService(INotificationRepository notificationRepository)
        {
            _notificationRepository = notificationRepository;
        }

        public async Task<List<Event>> GetAllNotifications()
        {
            return await _notificationRepository.GetAllNotifications();
        }
    }
}

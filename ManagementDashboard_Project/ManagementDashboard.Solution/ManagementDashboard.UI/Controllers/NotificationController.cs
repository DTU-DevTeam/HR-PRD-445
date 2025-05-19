using Management.Core.Domain.Entities.Data_Event;
using Management.Core.Services.NotificationServices;
using Microsoft.AspNetCore.Mvc;

namespace ManagementDashboard.UI.Controllers
{
    [Route("[Controller]/[action]")]
    public class NotificationController : Controller
    {
        public readonly NotificationGetterService _noticationGetterService;

        public NotificationController(NotificationGetterService noticationGetterService)
        {
            _noticationGetterService = noticationGetterService;
        }

        public async Task<IActionResult> Notifications()
        {
            List<Event> events = await _noticationGetterService.GetAllNotifications();

            return Json(events);
        }
    }
}

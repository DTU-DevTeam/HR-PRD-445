using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementDashboard.Core.Domain.Entities
{
    public class Attendance
    {
       
    }

    public class Attendance_MySql
    {
        public int AttendanceID { get; set; }
        public int EmployeeID { get; set; }
        public int WorkDays { get; set; }
        public int AbsentDays { get; set; }
        public int LeaveDays { get; set; }
        public DateTime AttentdanceMonth { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}

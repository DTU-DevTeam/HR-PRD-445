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
        public int Attendance_Id { get; set; }
        public int Employee_Id { get; set; }
        public DateOnly Date { get; set; }
        public string? status { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementDashboard.Core.Domain.Entities
{
    public class Employee
    {
       
        
    }

    public class Employee_SqlServer : Employee
    {
        [Key]
        public int EmployeeID { get; set; }
        public string FullName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public DateTime? HireDate { get; set; }
        public int DepartmentID { get; set; }
        public int PositionID { get; set; }
        public string? Status { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    public class Employee_MySql : Employee
    {
        [Key]
        public int EmployeeID { get; set; }
        public string FullName { get; set; }
        public int DepartmentID { get; set; }
        public int PositionID { get; set; }
        public string? Status { get; set; }
    }

}

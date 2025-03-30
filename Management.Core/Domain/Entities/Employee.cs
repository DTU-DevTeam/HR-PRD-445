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
        public int DepartmentID { get; set; }
        public int ApplicantID { get; set; }
        public DateOnly HireDate { get; set; }
        public decimal Salary { get; set; }
        public string? Status { get; set; }
    }

    public class Employee_MySql : Employee
    {
        [Key]
        public int Employee_ID { get; set; }
        public string First_Name { get; set; }
        public string Last_Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateOnly Hire_Date { get; set; }
        public int Department_ID { get; set; }
        public int Job_ID { get; set; }
        public decimal Salary { get; set; }
        public string? Status { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementDashboard.Core.Domain.Entities
{
    public class Salary
    {
        
    }

    public class Salary_MySQL : Salary
    {
        [Key]
        public int SalaryID { get; set; }
        public int EmployeeID { get; set; }
        public DateOnly SalaryMonth { get; set; }
        public decimal BaseSalary { get; set; }
        public decimal Bonus { get; set; }
        public decimal Deductions { get; set; }
        public decimal NetSalary { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}

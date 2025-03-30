using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementDashboard.Core.Domain.Entities
{
    public class PayRoll
    {
        
    }

    public class PayRoll_SQLServer : PayRoll
    {
        [Key]
        public int PayRollID { get; set; }
        public int EmployeeID { get; set; }
        public DateOnly PayDate { get; set; }
        public decimal BaseSalary { get; set; }
        public decimal Bonus { get; set; }
        public decimal Deduction { get; set; }
        public decimal NetSalary { get; set; }
    }

    public class  PayRoll_MySQL : PayRoll
    {
        [Key]
        public int PayRoll_ID { get; set; }
        public int Employee_ID { get; set; }
        public DateOnly Pay_Date { get; set; }
        public decimal Base_Salary { get; set; }
        public decimal Bonus { get; set; }
        public decimal Deductions { get; set; }
        public decimal Net_Salary { get; set; }
    }
}

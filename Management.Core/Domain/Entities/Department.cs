using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementDashboard.Core.Domain.Entities
{
    public class Department_SqlServer
    {
        [Key]
        public int DepartmentId { get; set; }

        public string? DepartmentName { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }

    public class Department_MySql
    {
        [Key]
        public int Department_ID { get; set; }

        public string? Department_Name { get; set; }

        
    }


}

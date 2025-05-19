using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementDashboard.Core.Domain.Entities
{
    public class Position
    {
       
    }

    public class Position_SqlServer
    {
        [Key]
        public int PositionID { get; set; }
        public string PositionName { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class Position_MySql
    {
        [Key]
        public int PositionID { get; set; }
        public string PositionName { get; set; }
      
    }
}

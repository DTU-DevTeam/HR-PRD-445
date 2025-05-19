using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Management.Core.Domain.Entities.Security_Entities
{
    [PrimaryKey(nameof(UserID), nameof(FunctionID))]
    public class User_FunctionPermission
    {
       
        public Guid UserID { get; set; }
        public Guid FunctionID { get; set; }
       
        public bool CanCreate { get; set; } = true;
        public bool CanRead { get; set; } = true;
        public bool CanUpdate { get; set; } = true;
        public bool CanDelete { get; set; } = true;
    }
}

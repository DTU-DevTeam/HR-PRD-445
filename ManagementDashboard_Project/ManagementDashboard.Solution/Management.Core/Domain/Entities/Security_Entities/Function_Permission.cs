using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Microsoft.EntityFrameworkCore;


namespace Management.Core.Domain.Entities.Security_Entities
{
    [PrimaryKey(nameof(GroupID), nameof(FunctionID))]
    public class Function_Permission
    {
        public Guid GroupID { get; set; }

        public Guid FunctionID { get; set; }
        public bool CanCreate { get; set; }
        public bool CanRead { get; set; }
        public bool CanUpdate { get; set; }

        public bool CanDelete { get; set; }
    }
}

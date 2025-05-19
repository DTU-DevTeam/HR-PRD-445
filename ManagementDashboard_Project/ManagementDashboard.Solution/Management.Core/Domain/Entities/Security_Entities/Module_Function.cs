using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Management.Core.Domain.Entities.Security_Entities
{
    [PrimaryKey(nameof(ModuleID), nameof(FunctionID))]
    public class Module_Function
    {
        public Guid ModuleID { get; set; }
        public Guid FunctionID { get; set; }
    }
}

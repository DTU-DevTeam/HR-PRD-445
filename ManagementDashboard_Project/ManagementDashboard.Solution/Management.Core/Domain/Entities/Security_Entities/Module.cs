using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Management.Core.Domain.Entities.Security_Entities
{
    public class Module
    {
        [Key]
        public Guid GroupID { get; set; }
        public string? ModuleName { get; set; }
    }
}

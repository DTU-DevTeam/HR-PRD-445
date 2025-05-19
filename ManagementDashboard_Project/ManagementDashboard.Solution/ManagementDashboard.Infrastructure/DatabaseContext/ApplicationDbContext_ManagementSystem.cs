using Management.Core.Domain.Entities.Data_Event;
using Management.Core.Domain.Entities.Security_Entities;
using Management.Core.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementDashboard.Infrastructure.DatabaseContext
{
    public class ApplicationDbContext_ManagementSystem : IdentityDbContext<ApplicationUser, ApplicationRole, Guid>
    {
        public ApplicationDbContext_ManagementSystem(DbContextOptions<ApplicationDbContext_ManagementSystem> options) : base(options)
        {

        }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<Function> Functions { get; set; }

        public DbSet<Function_Permission> FunctionPermissions { get; set; }
        public DbSet<Group> Groups { get; set; }

        public DbSet<Module> Modules { get; set; }

        public DbSet<Module_Function> ModuleFunctions { get; set; }

        public DbSet<Module_Permission> ModulePermissions { get; set; }

        public DbSet<User_FunctionPermission> UserFunctionPermissions { get; set; }

        public DbSet<User_Group> UserGroups { get; set; }

        public DbSet<Event> Events { get; set; } 


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.Entity<Account>().ToTable("Accounts");
            modelBuilder.Entity<Function>().ToTable("Functions");
            modelBuilder.Entity<Function_Permission>().ToTable("Function_Permissions");
            modelBuilder.Entity<Group>().ToTable("Groups");
            modelBuilder.Entity<Module>().ToTable("Modules");
            modelBuilder.Entity<Module_Function>().ToTable("Module_Function");
            modelBuilder.Entity<Module_Permission>().ToTable("Module_Permissions");
            modelBuilder.Entity<User_FunctionPermission>().ToTable("User_FunctionPermissions");
            modelBuilder.Entity<User_Group>().ToTable("User_Group");
            modelBuilder.Entity<Event>().ToTable("Events");
        }
    }
   
}

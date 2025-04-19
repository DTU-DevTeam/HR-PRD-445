using ManagementDashboard.Core.RepositoryContract;
using ManagementDashboard.Core.Services.HRServices;
using ManagementDashboard.Core.Services.PayRollServices;
using ManagementDashboard.Infrastructure.DatabaseContext;
using ManagementDashboard.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();


//Connection to SQL Server

builder.Services.AddDbContext<ApplicationDbContext_SqlServer>(options =>{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnectionSQLServer"));
});


builder.Services.AddScoped<IEmployeesRepository, EmployeesRepository>();
builder.Services.AddScoped<IPayRollRepository, PayRollRepository>();
builder.Services.AddScoped<HRGetterService>();
builder.Services.AddScoped<HRSorterService>();
builder.Services.AddScoped<PayRollGetterService>();
builder.Services.AddScoped<PayRollSorterService>();
//Connection to MySQL

var mySqlConnection = builder.Configuration.GetConnectionString("DefaultConnectionMySQL");

builder.Services.AddDbContext<ApplicationDbContext_MySql>(options =>
options.UseMySql(mySqlConnection, ServerVersion.AutoDetect(mySqlConnection))
);




var app = builder.Build();

app.MapControllers();

app.Run();

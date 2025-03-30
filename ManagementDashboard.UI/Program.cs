using ManagementDashboard.Infrastructure.DatabaseContext;
using ManagementDashboard.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();


//Connection to SQL Server

builder.Services.AddDbContext<ApplicationDbContext_SqlServer>(options =>{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnectionSQLServer"));
});


//Connection to MySQL

var mySqlConnection = builder.Configuration.GetConnectionString("DefaultConnectionMySQL");

builder.Services.AddDbContext<ApplicationDbContext_MySql>(options =>
options.UseMySql(mySqlConnection, ServerVersion.AutoDetect(mySqlConnection))
);

builder.Services.AddScoped<EmployeesRepository>();
builder.Services.AddScoped<ApplicantsRepository>();
builder.Services.AddScoped<DepartmentsRepository>();
builder.Services.AddScoped<PayRollRepository>();

var app = builder.Build();

app.MapControllers();

app.Run();

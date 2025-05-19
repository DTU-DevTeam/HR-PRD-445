using Management.Core.Identity;
using Management.Core.RepositoryContract;
using Management.Core.ServiceContracts;
using Management.Core.Services.AuthorizationServices;
using Management.Core.Services.HRServices;
using Management.Core.Services.JWTServices;
using Management.Core.Services.NotificationServices;
using ManagementDashboard.Core.RepositoryContract;
using ManagementDashboard.Core.Services.HRServices;
using ManagementDashboard.Core.Services.PayRollServices;
using ManagementDashboard.Infrastructure.DatabaseContext;
using ManagementDashboard.Infrastructure.Repositories;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;



var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();


//Connection to SQL Server

builder.Services.AddDbContext<ApplicationDbContext_SqlServer>(options =>{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnectionSQLServer"));
});

builder.Services.AddDbContext<ApplicationDbContext_ManagementSystem>(options => {
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnectionManagementHR-PR"));
});


builder.Services.AddScoped<IEmployeesRepository, EmployeesRepository>();
builder.Services.AddScoped<IPayRollRepository, PayRollRepository>();
builder.Services.AddScoped<IDepartmentsRepository, DepartmentsRepository>();
builder.Services.AddScoped<IPositionsRepository, PositionsRepository>();
builder.Services.AddScoped<ISecurityRepository, SecurityRepository>();
builder.Services.AddScoped<IAttendanceRepository, AttendanceRepository>();
builder.Services.AddScoped<INotificationRepository, NotificationRepository>();

builder.Services.AddScoped<HRGetterService>();
builder.Services.AddScoped<HRSorterService>();
builder.Services.AddScoped<HRAddService>();
builder.Services.AddScoped<HREditService>();
builder.Services.AddScoped<HRDeleteService>();
builder.Services.AddScoped<PayRollGetterService>();
builder.Services.AddScoped<PayRollSorterService>();
builder.Services.AddScoped<DepartmentsRepository>();
builder.Services.AddScoped<AuthorizationService>();
builder.Services.AddScoped<NotificationGetterService>();
builder.Services.AddTransient<IJwtService, JwtService>();



//Connection to MySQL





// Thêm các d?ch v? khác...
builder.Services.AddControllers();



builder.Services.AddIdentity<ApplicationUser, ApplicationRole>(options =>
{ //set dk toi thieu ve mat khau
    options.Password.RequiredLength = 5; //mat khau toi thieu la 5 ki tu
    options.Password.RequireNonAlphanumeric = false; //ko bat buoc mk phai la chu hay ki tu
    options.Password.RequireUppercase = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireDigit = false;
    options.Password.RequiredUniqueChars = 3; //eg: AB12AB(unique characters are A, B, 1, 2) 3 ki tu doc  nhat tro len
}).AddUserStore<UserStore<ApplicationUser, ApplicationRole, ApplicationDbContext_ManagementSystem, Guid>>().AddRoleStore<RoleStore<ApplicationRole, ApplicationDbContext_ManagementSystem, Guid>>();



// enable CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("https://localhost:3000") // allow use domain React
                  .AllowCredentials()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
                  
                  
        });
});


builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = true;

        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                context.Token = context.Request.Cookies["jwt_token"];
                return Task.CompletedTask;
            }
        };

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],

            ValidateAudience = true,
            ValidAudience = builder.Configuration["Jwt:Audience"],

            ValidateLifetime = true,

            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])
            ),
            ClockSkew = TimeSpan.FromMinutes(5)
        };
    });


var mySqlConnection = builder.Configuration.GetConnectionString("DefaultConnectionMySQL");

builder.Services.AddDbContext<ApplicationDbContext_MySql>(options =>
options.UseMySql(mySqlConnection, ServerVersion.AutoDetect(mySqlConnection))
);

builder.Services.AddHttpClient();



var app = builder.Build();

app.Use(async (context, next) =>
{
    // delete header X-Frame-Options if it exists
    context.Response.Headers.Remove("X-Frame-Options");

    // add Content-Security-Policy allow localhost:3000 use
    context.Response.Headers.Append("Content-Security-Policy", "frame-ancestors 'self'  https://localhost:3000/");

    

    await next();
});

app.UseRouting();
// CORS 
app.UseCors("AllowFrontend");



app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

//app.Urls.Add("http://0.0.0.0:5000");

app.Run();

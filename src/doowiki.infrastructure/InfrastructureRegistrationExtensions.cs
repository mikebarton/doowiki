using doowiki.infrastructure.Data;
using doowiki.infrastructure.Identity;
using doowiki.application.Common.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;

namespace doowiki.infrastructure
{
    public static class InfrastructureRegistrationExtensions
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration config)
        {
            var dataConnectionString = config.GetConnectionString("doowiki-mysql");
            if (string.IsNullOrEmpty(dataConnectionString))
                throw new ArgumentNullException("doowiki-myself - connection string");

            services.AddDbContext<AppIdentityDbContext>(options => options.UseMySql(dataConnectionString, ServerVersion.AutoDetect(dataConnectionString)));
            services.AddDbContext<ApplicationDbContext>(options => options.UseMySql(dataConnectionString, ServerVersion.AutoDetect(dataConnectionString)));
            services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());

            services.AddTransient<IIdentityService, IdentityService>();
            services.AddScoped<ApplicationDbContextInitialiser>();

            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequiredLength = 6;
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                options.Lockout.MaxFailedAccessAttempts = 5;
                options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
                options.User.RequireUniqueEmail = false;
            });

            services.AddHealthChecks()
                .AddDbContextCheck<ApplicationDbContext>();

            //services
            //.AddDefaultIdentity<AppUser>()
            //.AddRoles<AppRole>()
            //.AddEntityFrameworkStores<ApplicationDbContext>();

            services.AddIdentity<AppUser, AppRole>()
            .AddEntityFrameworkStores<AppIdentityDbContext>()
            .AddDefaultUI()
            .AddDefaultTokenProviders();

            return services;
        }

        public static WebApplication ApplyMigrations(this WebApplication app)
        {
            using(var scope = app.Services.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                dbContext.Database.Migrate();

                var identityContext = scope.ServiceProvider.GetRequiredService<AppIdentityDbContext>();
                identityContext.Database.Migrate();
            }

            return app;
        }
    }
}

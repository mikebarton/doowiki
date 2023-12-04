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

namespace doowiki.infrastructure
{
    public static class InfrastructureRegistrationExtensions
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration config)
        {
            var dataConnectionString = config.GetConnectionString("doowiki-mysql");
            if (string.IsNullOrEmpty(dataConnectionString))
                throw new ArgumentNullException("doowiki-myself - connection string");



            services.AddDbContext<IdentityDbContext>(options => options.UseMySql(dataConnectionString, ServerVersion.AutoDetect(dataConnectionString)));
            services.AddDbContext<ApplicationDbContext>(options => options.UseMySql(dataConnectionString, ServerVersion.AutoDetect(dataConnectionString)));
            services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());

            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequiredLength = 6;
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                options.Lockout.MaxFailedAccessAttempts = 5;
                options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
                options.User.RequireUniqueEmail = false;
            });

            services
            .AddDefaultIdentity<AppUser>()
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>();

            return services;
        }
    }
}

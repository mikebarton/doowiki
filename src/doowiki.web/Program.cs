
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using doowiki.infrastructure;
using doowiki.application;
using doowiki.infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using doowiki.api.Infrastructure;
using Microsoft.AspNetCore.Builder;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace doowiki.api
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddApplicationServices();
            builder.Services.AddInfrastructureServices(builder.Configuration);
            builder.Services.AddWebServices();


            //builder.Services.ConfigureApplicationCookie(options =>
            //{
            //    // Cookie settings
            //    options.Cookie.HttpOnly = true;
            //    options.ExpireTimeSpan = TimeSpan.FromMinutes(5);

            //    options.LoginPath = "/Identity/Account/Login";
            //    options.AccessDeniedPath = "/Identity/Account/AccessDenied";
            //    options.SlidingExpiration = true;
            //});


            
            //builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddSwaggerGen();

            var app = builder.Build();            

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                await app.InitialiseDatabaseAsync();
            }
            else
            {
                app.UseHsts();
            }



            app.UseHttpsRedirection();

            //app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();
            //app.MapControllers();
            app.MapEndpoints();

            app.Run();
        }
    }
}

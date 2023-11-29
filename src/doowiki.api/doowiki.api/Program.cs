
using doowiki.api.Documents;
using doowiki.api.UserManagement;
using Microsoft.EntityFrameworkCore;

namespace doowiki.api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var dataConnectionString = builder.Configuration.GetConnectionString("doowiki-mysql");
            // Add services to the container.
            builder.Services.AddDbContext<UserManagementDbContext>(options =>
            {
                var dataConnectionString = builder.Configuration.GetConnectionString("doowiki-mysql");
                if (string.IsNullOrEmpty(dataConnectionString))
                    throw new ArgumentNullException("doowiki-myself - connection string");

                options.UseMySql(builder.Configuration.GetConnectionString("doowiki-mysql"), ServerVersion.AutoDetect(dataConnectionString));
            });

            builder.Services.AddDbContext<DocumentDbContext>(options =>
            {
                var dataConnectionString = builder.Configuration.GetConnectionString("doowiki-mysql");
                if (string.IsNullOrEmpty(dataConnectionString))
                    throw new ArgumentNullException("doowiki-myself - connection string");

                options.UseMySql(builder.Configuration.GetConnectionString("doowiki-mysql"), ServerVersion.AutoDetect(dataConnectionString));
            });
            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}

using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.infrastructure.Data
{
    public class ApplicationDbDesignTimeContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();

            var connString = "server=127.0.0.1;uid=dev;pwd=telogreika;database=doowiki";
            optionsBuilder.UseMySql(connString, ServerVersion.AutoDetect(connString));

            return new ApplicationDbContext(optionsBuilder.Options);
        }
    }
}

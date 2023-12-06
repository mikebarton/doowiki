using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using doowiki.infrastructure.Identity;

namespace doowiki.infrastructure.Data
{
    public class IdentityDbDesignTimeContextFactory : IDesignTimeDbContextFactory<IdentityDbContext>
    {
        public IdentityDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<IdentityDbContext>();

            var connString = "server=127.0.0.1;uid=dev;pwd=telogreika;database=doowiki";
            optionsBuilder.UseMySql(connString, ServerVersion.AutoDetect(connString));

            return new IdentityDbContext(optionsBuilder.Options);
        }
    }
}

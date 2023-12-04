using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using doowiki.domain.Wiki;
using doowiki.application.Common.Interfaces;

namespace doowiki.infrastructure.Data
{
    internal class ApplicationDbContext : DbContext, IApplicationDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> context) : base(context)
        {

        }

        public DbSet<DocumentMetaData> Documents { get; set; }
        public DbSet<WikiUser> Users { get; set; }
        public DbSet<Space> Spaces { get; set; }
        
    }
}

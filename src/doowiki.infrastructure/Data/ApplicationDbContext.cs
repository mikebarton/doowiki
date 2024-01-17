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
    public class ApplicationDbContext : DbContext, IApplicationDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> context) : base(context)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<DocumentContent>().HasKey(x => x.DocumentId);
            modelBuilder.Entity<DocumentMetaData>().HasKey(x => x.DocumentId);
            modelBuilder.Entity<DocumentMetaData>()
                .HasOne<DocumentContent>(x => x.Content)
                .WithOne()
                .HasForeignKey<DocumentContent>(x=>x.DocumentId);            
        }

        public DbSet<DocumentMetaData> Documents { get; set; }
        public DbSet<WikiUser> Users { get; set; }
        public DbSet<Space> Spaces { get; set; }
        
    }
}

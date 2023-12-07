using doowiki.domain.Wiki;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using doowiki.domain;

namespace doowiki.application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        public DbSet<DocumentMetaData> Documents { get; }
        public DbSet<domain.Wiki.WikiUser> Users { get; }
        public DbSet<Space> Spaces { get; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}

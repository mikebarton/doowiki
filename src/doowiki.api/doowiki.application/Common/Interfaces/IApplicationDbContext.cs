using doowiki.domain.Wiki;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.Common.Interfaces
{
    internal interface IApplicationDbContext
    {
        public DbSet<DocumentMetaData> Documents { get; }
        public DbSet<WikiUser> Users { get; }
        public DbSet<Space> Spaces { get; }
    }
}

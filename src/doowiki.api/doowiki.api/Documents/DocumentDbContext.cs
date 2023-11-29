using doowiki.api.UserManagement;
using Microsoft.EntityFrameworkCore;

namespace doowiki.api.Documents
{
    public class DocumentDbContext :  DbContext
    {
        public DocumentDbContext(DbContextOptions<DocumentDbContext> context) : base(context)
        {

        }
        public DbSet<DocumentMetaData> DocumentMetaData { get; set; }
        public DbSet<DocumentContent> DocumentContent { get; set; }
    }
}

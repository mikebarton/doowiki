using Microsoft.EntityFrameworkCore;

namespace doowiki.api.UserManagement
{
    public class UserManagementDbContext : DbContext
    {
        public UserManagementDbContext(DbContextOptions<UserManagementDbContext> context) : base(context)
        {
            
        }
        public DbSet<WikiUser> Users { get; set; }
    }
}

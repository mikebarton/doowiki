using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.domain.Constants
{
    public abstract class Roles
    {
        public const string Admin = nameof(Admin);
        public const string Author = nameof(Author);
        public const string ReadOnly = nameof(ReadOnly);

        public static string[] RoleNames = [Admin, Author, ReadOnly];
    }
}

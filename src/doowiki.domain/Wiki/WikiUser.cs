using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.domain.Wiki
{
    public class WikiUser
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Guid IdentityUserId { get; set; }

        [NotMapped]
        public string FullName
        {
            get => !string.IsNullOrWhiteSpace(FirstName) && !string.IsNullOrWhiteSpace(LastName) ? $"{FirstName} {LastName}" : FirstName ?? LastName;
        }
    }
}

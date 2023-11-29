using doowiki.api.UserManagement;
using Microsoft.EntityFrameworkCore;

namespace doowiki.api.Documents
{
    public class DocumentContent
    {        

        public Guid DocumentContentId { get; set; }
        public string DocumentMarkup { get; set; }
    }
}

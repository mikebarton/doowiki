using doowiki.domain.Wiki;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.Documents.Queries.GetDocument
{
    internal class DocumentDto
    {
        public Guid DocumentId { get; set; }
        public string Name { get; set; }
        public DateTimeOffset CreatedOn { get; set; }
        public DateTimeOffset UpdatedOn { get; set; }
        public string AuthorName { get; set; }
        public string Content { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.Documents.Queries.GetDocumentTree
{
    public class DocumentTreeDto
    {
        public Guid DocumentId { get; set; }
        public string Name { get; set; }
        public DateTimeOffset CreatedOn { get; set; }
        public DateTimeOffset UpdatedOn { get; set; }
        public string AuthorName { get; set; }

        public Guid? ParentId { get; set; }

        public List<DocumentTreeDto> Children { get; set; }
    }
}

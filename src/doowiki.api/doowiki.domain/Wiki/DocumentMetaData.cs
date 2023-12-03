using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.domain.Wiki
{
    public class DocumentMetaData
    {
        public Guid DocumentId { get; set; }
        public Guid SpaceId { get; set; }
        public string? Slug { get; set; }
        public string Name { get; set; }
        public DateTimeOffset CreatedOn { get; set; }
        public DateTimeOffset UpdatedOn { get; set; }
        public DocumentMetaData ParentDocument { get; set; }
        public DocumentMetaData Children { get; set; }
        public WikiUser Author { get; set; }
        public DocumentContent Content { get; set; }
    }
}

using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.Documents.Queries.GetDocument
{
    public class GetDocumentRequest : IRequest<DocumentDto>
    {
        public Guid DocumentId { get; set; }
    }
}

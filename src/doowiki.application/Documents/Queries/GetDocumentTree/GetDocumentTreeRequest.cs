using doowiki.application.Documents.Queries.GetDocumentList;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.Documents.Queries.GetDocumentTree
{
    public class GetDocumentTreeRequest : IRequest<DocumentTreeDto[]>
    {
        public Guid SpaceId { get; set; }
    }
}

using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.Documents.Queries.GetDocumentList
{
    public class GetDocumentListRequest : IRequest<DocumentMetaDto[]>
    {
        public Guid SpaceId { get; set; }
    }
}

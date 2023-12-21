using doowiki.application.Common.Security;
using doowiki.application.Documents.Queries.GetDocumentList;
using doowiki.domain.Constants;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.Documents.Queries.GetDocumentTree
{
    [Authorize(Roles = $"{Roles.Admin}, {Roles.Author}, {Roles.ReadOnly}")]
    public class GetDocumentTreeRequest : IRequest<DocumentTreeDto[]>
    {
        public Guid SpaceId { get; set; }
    }
}

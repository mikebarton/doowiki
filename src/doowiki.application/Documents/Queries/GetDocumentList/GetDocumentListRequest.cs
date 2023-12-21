using doowiki.application.Common.Security;
using doowiki.domain.Constants;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.Documents.Queries.GetDocumentList
{
    [Authorize(Roles = $"{Roles.Admin}, {Roles.Author}, {Roles.ReadOnly}")]
    public class GetDocumentListRequest : IRequest<DocumentMetaDto[]>
    {
        public Guid SpaceId { get; set; }
    }
}

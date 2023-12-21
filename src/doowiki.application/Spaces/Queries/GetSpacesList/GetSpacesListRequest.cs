using doowiki.application.Common.Security;
using doowiki.domain.Constants;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.Spaces.Queries.GetSpacesList
{
    [Authorize(Roles = $"{Roles.Admin}, {Roles.Author}, {Roles.ReadOnly}")]
    public class GetSpacesListRequest : IRequest<SpaceDto[]>
    {
    }
}

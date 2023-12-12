using doowiki.application.Common.Security;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.Spaces.Queries.GetSpacesList
{
    [Authorize]
    public class GetSpacesListRequest : IRequest<SpaceDto[]>
    {
    }
}

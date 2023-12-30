using doowiki.application.Common.Security;
using doowiki.domain.Constants;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.Spaces.Commands.DeleteSpace
{
    [Authorize(Roles =Roles.Admin)]
    public class DeleteSpaceCommand : IRequest
    {
        public Guid SpaceId { get; set; }
    }
}

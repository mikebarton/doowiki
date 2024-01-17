using doowiki.api.Infrastructure;
using doowiki.application.Common.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Builder;
using System.Threading.Tasks;
using doowiki.application.Security.Commands.SetUserRoles;
using Microsoft.AspNetCore.Http;

namespace doowiki.web.Endpoints
{
    public class Security : EndpointGroupBase
    {
        public override void Map(WebApplication app)
        {
            app.MapGroup(this)
                .RequireAuthorization()
                .MapGet(GetSession, "/session")
                .MapPost(SetRoles, "/roles");
        }

        public async Task<SessionContext> GetSession(ISender sender, IUser user)
        {
            var rolesDto = await sender.Send(new application.Security.Query.GetUserRoles.GetUserRolesRequest { IdentityUserId = user.Id });
            return new SessionContext(rolesDto.Roles);
        }

        public async Task<IResult> SetRoles(ISender sender, SetUserRolesCommand command)
        {
            await sender.Send(command);
            return Results.Ok();
        }

        public record SessionContext(string[] Roles);

    }
}

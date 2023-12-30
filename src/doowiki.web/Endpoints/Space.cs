using doowiki.api.Infrastructure;
using doowiki.application.Spaces.Commands.DeleteSpace;
using doowiki.application.Spaces.Commands.SaveSpace;
using doowiki.application.Spaces.Queries.GetSpacesList;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace doowiki.api.Endpoints
{
    public class Space : EndpointGroupBase
    {
        public override void Map(WebApplication app)
        {
            app.MapGroup(this)
                .RequireAuthorization()
                .MapPost(SaveSpace)
                .MapGet(GetSpaces)
                .MapDelete(DeleteSpace, "{id}");
        }

        public async Task<IResult> SaveSpace(ISender sender, SaveSpaceCommand command)
        {
            var id = await sender.Send(command);
            return Results.Ok();
        }

        public async Task<SpaceDto[]> GetSpaces(ISender sender)
        {
            var spaces = await sender.Send(new GetSpacesListRequest());
            return spaces;
        }

        public async Task DeleteSpace(ISender sender, Guid id)
        {
            await sender.Send(new DeleteSpaceCommand { SpaceId = id });
        }
    }
}

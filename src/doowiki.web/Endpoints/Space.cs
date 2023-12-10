using doowiki.api.Infrastructure;
using doowiki.application.Spaces.Commands;
using doowiki.application.Spaces.Queries.GetSpacesList;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace doowiki.api.Endpoints
{
    public class Space : EndpointGroupBase
    {
        public override void Map(WebApplication app)
        {
            app.MapGroup(this)
                .MapPost(SaveSpace)
                .MapGet(GetSpaces);
        }

        public async Task<IResult> SaveSpace(ISender sender, SaveSpaceCommand command)
        {
            var id = await sender.Send(command);
            return Results.Ok();
        }

        public async Task<SpacesListDto> GetSpaces(ISender sender)
        {
            var spaces = await sender.Send(new GetSpacesListRequest());
            return spaces;
        }
    }
}

using doowiki.api.Infrastructure;
using doowiki.application.Spaces.Commands;
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
                .MapPost(SaveSpace);
        }

        public async Task<IResult> SaveSpace(ISender sender, SaveSpaceCommand command)
        {
            var id = await sender.Send(command);
            return Results.Ok();
        }
    }
}

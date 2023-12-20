using doowiki.api.Infrastructure;
using doowiki.application.WikiUser.Queries.GetUserList;
using MediatR;
using Microsoft.AspNetCore.Builder;
using System.Threading.Tasks;

namespace doowiki.web.Endpoints
{
    public class Users : EndpointGroupBase
    {
        public override void Map(WebApplication app)
        {
            app.MapGroup(this)
                .RequireAuthorization()
                .MapGet(GetUserList);
        }

        public async Task<GetUserDto[]> GetUserList(ISender sender)
        {
            var users = await sender.Send(new GetUserListRequest());
            return users;
        }
    }
}

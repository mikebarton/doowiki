using doowiki.api.Infrastructure;
using doowiki.application.WikiUser.Commands.CreateUser;
using doowiki.application.WikiUser.Commands.DeleteUser;
using doowiki.application.WikiUser.Commands.SaveUser;
using doowiki.application.WikiUser.Queries.GetUser;
using doowiki.application.WikiUser.Queries.GetUserList;
using MediatR;
using Microsoft.AspNetCore.Builder;
using System;
using System.Threading.Tasks;

namespace doowiki.web.Endpoints
{
    public class Users : EndpointGroupBase
    {
        public override void Map(WebApplication app)
        {
            app.MapGroup(this)
                .RequireAuthorization()
                .MapGet(GetUserList, "/list")
                .MapGet(GetUser, "{id}")
                .MapPut(UpdateUser, "{id}")
                .MapPost(CreateUser)
                .MapDelete(DeleteUser, "{id}");
        }

        public async Task<GetUserItemDto[]> GetUserList(ISender sender)
        {
            var users = await sender.Send(new GetUserListRequest());
            return users;
        }

        public async Task<GetUserDto> GetUser(ISender sender, Guid id)
        {
            var user = await sender.Send(new GetUserRequest { UserId = id });
            return user;
        }

        public async Task<Guid> UpdateUser(ISender sender, UpdateUserCommand command, Guid id)
        {
            var returnedId = await sender.Send(command);
            return returnedId;
        }

        public async Task<Guid> CreateUser(ISender sender, CreateUserCommand command)
        {
            var id = await sender.Send(command);
            return id;
        }

        public async Task DeleteUser(ISender sender, Guid id)
        {
            await sender.Send(new DeleteUserCommand() { UserId = id });
        }
    }
}

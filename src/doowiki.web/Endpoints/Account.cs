using doowiki.api.Infrastructure;
using doowiki.application.Common.Interfaces;
using doowiki.application.Common.Models;
using doowiki.application.Documents.Queries.GetDocument;
using doowiki.infrastructure.Identity;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading.Tasks;

namespace doowiki.api.Endpoints
{
    public class Account : EndpointGroupBase
    {
        public override void Map(WebApplication app)
        {            
            app.MapGroup(this)            
                .MapPost(Login, "login")
                .MapPost(Logout, "logout");
        }

        public async Task<IResult> Login(ISender sender, SignInManager<AppUser> signInManager, LoginDto command)
        {            
            var user = await signInManager.UserManager.FindByEmailAsync(command.Email);
            if (user == null)
                return Results.NotFound();

            if (!await signInManager.UserManager.CheckPasswordAsync(user, command.Password))
                return Results.Problem();

            await signInManager.SignInAsync(user, true);

            var rolesDto = await sender.Send(new application.Security.Query.GetUserRoles.GetUserRolesRequest { IdentityUserId = user.Id });

            return Results.Ok();
        }        

        public async Task<IResult> Logout(SignInManager<AppUser> signInManager)
        {
            await signInManager.SignOutAsync();

            return Results.Ok();
        }

        public record LoginDto(string Email, string Password);
    }
}

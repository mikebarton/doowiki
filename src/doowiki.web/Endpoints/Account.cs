using doowiki.api.Infrastructure;
using doowiki.application.Documents.Queries.GetDocument;
using doowiki.infrastructure.Identity;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
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

        public async Task<IResult> Login(SignInManager<AppUser> signInManager, LoginDto command)
        {            
            var user = await signInManager.UserManager.FindByEmailAsync(command.Email);
            if (user == null)
                return Results.NotFound();

            if (!await signInManager.UserManager.CheckPasswordAsync(user, command.Password))
                return Results.BadRequest();

            await signInManager.SignInAsync(user, true);

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

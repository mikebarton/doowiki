using doowiki.api.Infrastructure;
using doowiki.application.Documents.Commands.SaveDocument;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Threading.Tasks;

namespace doowiki.web.Endpoints
{
    public class Spa : EndpointGroupBase
    {
        public override void Map(WebApplication app)
        {
            app.MapWhen(con => !con.Request.Path.StartsWithSegments("/api"), builder =>
            {
                builder.UseSpaStaticFiles();

                builder.UseSpa(spa =>
                {
                    spa.Options.SourcePath = "ClientApp";

                    if (app.Environment.IsDevelopment())
                    {
                        spa.UseReactDevelopmentServer(npmScript: "start");
                    }
                });
            });
            
        }
    }
}

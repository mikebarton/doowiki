using doowiki.api.Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace doowiki.web.Endpoints
{
    public class Spa : EndpointGroupBase
    {
        public override void Map(WebApplication app)
        {            
            app.Map(new PathString(""), client =>
            {                
                client.UseSpaStaticFiles();

                client.UseSpa(spa =>
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

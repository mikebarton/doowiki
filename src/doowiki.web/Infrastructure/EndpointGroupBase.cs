using Microsoft.AspNetCore.Builder;

namespace doowiki.api.Infrastructure
{
    public abstract class EndpointGroupBase
    {
        public abstract void Map(WebApplication app);
    }
}

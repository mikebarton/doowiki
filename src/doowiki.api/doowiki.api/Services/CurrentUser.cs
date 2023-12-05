using doowiki.application.Common.Interfaces;
using System.Security.Claims;

namespace doowiki.api.Services
{
    public class CurrentUser : IUser
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ILogger _logger;

        public CurrentUser(IHttpContextAccessor httpContextAccessor, ILogger<CurrentUser> logger)
        {
            _httpContextAccessor = httpContextAccessor;
            _logger = logger;
        }

        public Guid Id => BuildId(_httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier));

        private Guid BuildId(string? idClaim)
        {
            if (string.IsNullOrEmpty(idClaim))
                return Guid.Empty;

            try
            {
                return new Guid(idClaim);
            }
            catch
            {
                _logger.LogError($"Error building user Id from name claim - {idClaim}");
                return Guid.Empty;
            }
        }
    }
}

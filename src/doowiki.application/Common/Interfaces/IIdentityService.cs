using doowiki.application.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.Common.Interfaces
{
    public interface IIdentityService
    {
        Task<string?> GetUserNameAsync(Guid userId);

        Task<bool> AddUserToRole(Guid userId, params string[] roleNames);

        Task<bool> IsInRoleAsync(Guid userId, string role);

        Task<IList<string>> GetUserRoles(Guid userId);

        //Task<bool> AuthorizeAsync(Guid userId, string policyName);

        Task<(Result Result, Guid UserId)> CreateUserAsync(string email, string password);

        Task<Result> DeleteUserAsync(Guid userId);
    }
}

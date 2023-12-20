using doowiki.application.Common.Interfaces;
using doowiki.application.Common.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.infrastructure.Identity
{
    public class IdentityService : IIdentityService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IUserClaimsPrincipalFactory<AppUser> _userClaimsPrincipalFactory;
        private readonly IAuthorizationService _authorizationService;

        public IdentityService(
            UserManager<AppUser> userManager,
            IUserClaimsPrincipalFactory<AppUser> userClaimsPrincipalFactory,
            IAuthorizationService authorizationService)
        {
            _userManager = userManager;
            _userClaimsPrincipalFactory = userClaimsPrincipalFactory;
            _authorizationService = authorizationService;
        }

        public async Task<string?> GetUserNameAsync(Guid userId)
        {
            var user = await _userManager.Users.FirstAsync(u => u.Id == userId);

            return user.UserName;
        }

        public async Task<(Result Result, Guid UserId)> CreateUserAsync(string email, string password)
        {
            var user = new AppUser
            {
                UserName = email,
                Email = email,
            };            
            
            var result = await _userManager.CreateAsync(user, password);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<bool> AddUserToRole(Guid userId, params string[] roleNames)
        {
            var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);

            if (user == null)
            {
                return false;
            }

            var result = await _userManager.AddToRolesAsync(user, roleNames);

            return result.Succeeded;
        }

        //public async Task<bool> AddUserToPolicy(Guid userId, string[] policies)
        //{
        //    var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);

        //    if (user == null)
        //    {
        //        return false;
        //    }
            
        //    await _userManager.AddClaimsAsync(user, policies.Select(x=> ))
        //}

        public async Task<bool> IsInRoleAsync(Guid userId, string role)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(u => u.Id == userId);
            
            return user != null && await _userManager.IsInRoleAsync(user, role);
        }

        public async Task<IList<string>> GetUserRoles(Guid userId)
        {
            var user = await _userManager.Users.SingleAsync(u => u.Id == userId);

            var roles = await _userManager.GetRolesAsync(user);

            return roles;
        }

        //public async Task<bool> AuthorizeAsync(Guid userId, string policyName)
        //{
        //    var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);

        //    if (user == null)
        //    {
        //        return false;
        //    }

        //    var principal = await _userClaimsPrincipalFactory.CreateAsync(user);

        //    var result = await _authorizationService.AuthorizeAsync(principal, policyName);

        //    return result.Succeeded;
        //}

        public async Task<Result> DeleteUserAsync(Guid userId)
        {
            var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);

            return user != null ? await DeleteUserAsync(user) : Result.Success();
        }

        public async Task<Result> DeleteUserAsync(AppUser user)
        {
            var result = await _userManager.DeleteAsync(user);

            return result.ToApplicationResult();
        }
    }
}

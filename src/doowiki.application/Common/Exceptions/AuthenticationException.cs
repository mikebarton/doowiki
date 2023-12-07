using doowiki.application.Common.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.Common.Exceptions
{
    internal class AuthenticationException : Exception
    {
        public AuthenticationException(string message, IUser user) : base(message)
        {
            User = user;
        }

        public IUser? User { get; init; }
    }
}

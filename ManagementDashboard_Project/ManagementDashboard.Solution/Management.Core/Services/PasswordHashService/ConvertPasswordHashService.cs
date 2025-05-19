using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Management.Core.Services.PasswordHashService
{
    public static class ConvertPasswordHashService
    {
        private static readonly PasswordHasher<string> _passwordHasher = new PasswordHasher<string>();

        public static string HashPassword(string user, string password)
        {
            // string userId hoặc username có thể là một yếu tố phân biệt cho từng người dùng
            return _passwordHasher.HashPassword(user, password);
        }

        public static bool VerifyPassword(string user, string hashedPassword, string plainPassword)
        {
            var result = _passwordHasher.VerifyHashedPassword(user, hashedPassword, plainPassword);
            return result == PasswordVerificationResult.Success;
        }
    }
}

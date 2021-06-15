using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SIGECA_Shop.Models
{
    public class UserToken
    {


        #region Propiedades
        /// <summary>
        /// ok
        /// </summary>
        public bool Ok { get; set; }
        /// <summary>
        /// JWT token
        /// </summary>
        public string Token { get; set; }
        /// <summary>
        /// expiration
        /// </summary>
        public DateTime Expiration { get; set; }

        #endregion


        #region construir el Token
        /// <summary>
        /// contructor Por Defecto
        /// </summary>
        public UserToken()
        {
            this.Ok = false;
            this.Token = null;
            this.Expiration = DateTime.Now;
        }

        public UserToken(Cliente userInfo, IList<string> roles, IConfiguration _configuration)
        {
            try
            {

                var claims = new List<Claim>
                {
                new Claim(JwtRegisteredClaimNames.UniqueName, userInfo.nombreUsuario),
                new Claim("PasdWord", "XD No Hay Nada -.-!"),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                foreach (var rol in roles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, rol));
                }

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:key"]));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var expiration = DateTime.UtcNow.AddDays(7);

                JwtSecurityToken token = new JwtSecurityToken(
                   issuer: null,
                   audience: null,
                   claims: claims,
                   expires: expiration,
                   signingCredentials: creds);


                this.Ok = true;
                this.Token = new JwtSecurityTokenHandler().WriteToken(token);
                this.Expiration = expiration;

            }
            catch (Exception x)
            {
                Console.WriteLine("Exception Catch!!");
                Console.WriteLine("Messeger {0}", x.Message);

                this.Ok = false;
                this.Token = null;
                this.Expiration = DateTime.Now;

            }
        }

        #endregion




    }
}

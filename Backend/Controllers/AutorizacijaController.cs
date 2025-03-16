using Backend.Data;
using Backend.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    /// <summary>
    /// Kontroler za autorizaciju korisnika.
    /// </summary>
    /// <remarks>
    /// Inicijalizira novu instancu klase <see cref="AutorizacijaController"/>.
    /// </remarks>
    /// <param name="context">Kontekst baze podataka.</param>
    [ApiController]
    [Route("api/v1/[controller]")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))] // Vraća JWT token kao string
    [ProducesResponseType(StatusCodes.Status400BadRequest)] // Vraća BadRequest ako je model nevažeći
    [ProducesResponseType(StatusCodes.Status403Forbidden, Type = typeof(string))] // Vraća Forbidden s porukom o grešci
    public class AutorizacijaController(BackendContext context) : ControllerBase
    {
        /// <summary>
        /// Kontekst baze podataka
        /// </summary>
        private readonly BackendContext _context = context;

        /// <summary>
        /// Generira token za autorizaciju.
        /// </summary>
        /// <param name="operater">DTO objekt koji sadrži email i lozinku operatera.</param>
        /// <returns>JWT token ako je autorizacija uspješna, inače vraća status 403.</returns>
        /// <remarks>
        /// Primjer zahtjeva:
        /// <code lang="json">
        /// {
        ///    "email": "stojancaric8@gmail.com",
        ///    "password": "Rinolan1"
        /// }
        /// </code>
        /// </remarks>
        [HttpPost("token")]
        public async Task<IActionResult> GenerirajToken(OperaterDTO operater)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var operBaza = await _context.Operateri
                .Where(p => p.Email!.Equals(operater.Email))
                .FirstOrDefaultAsync();

            if (operBaza == null)
            {
                return StatusCode(StatusCodes.Status403Forbidden, "Niste autorizirani, ne mogu naći operatera");
            }

            if (!BCrypt.Net.BCrypt.Verify(operater.Password, operBaza.Lozinka))
            {
                return StatusCode(StatusCodes.Status403Forbidden, "Niste autorizirani, lozinka ne odgovara");
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes("MojKljucKojijeJakoTajan i dovoljno dugačak da se može koristiti");

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Expires = DateTime.UtcNow.Add(TimeSpan.FromHours(8)),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwt = tokenHandler.WriteToken(token);

            return Ok(jwt);
        }
    }
}
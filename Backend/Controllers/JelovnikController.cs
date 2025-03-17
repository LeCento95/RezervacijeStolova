using AutoMapper;
using Backend.Data;
using Backend.Models;
using Backend.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace Backend.Controllers
{
    /// <summary>
    /// Kontroler za upravljanje jelovnikom u aplikaciji.
    /// </summary>
    /// <param name="context">Kontekst baze podataka.</param>
    /// <param name="mapper">Mapper za mapiranje objekata.</param>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class JelovnikController(BackendContext context, IMapper mapper) : BackendController(context, mapper)
    {
        /// <summary>
        /// Dohvaća sve stavke jelovnika.
        /// </summary>
        /// <returns>Lista DTO-ova stavki jelovnika.</returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<JelovnikDTORead>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<JelovnikDTORead>>> Get()
        {
            try
            {
                var j = await _context.Jelovnik.ToListAsync();
                return Ok(_mapper.Map<IEnumerable<JelovnikDTORead>>(j));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        /// <summary>
        /// Dohvaća stavku jelovnika prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra stavke jelovnika.</param>
        /// <returns>DTO stavke jelovnika.</returns>
        [HttpGet("{sifra:int}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(JelovnikDTORead))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<JelovnikDTORead>> Get(int sifra)
        {
            try
            {
                var j = await _context.Jelovnik.FindAsync(sifra);

                if (j == null)
                {
                    return NotFound(new { poruka = $"Stavka jelovnika sa šifrom {sifra} ne postoji." });
                }

                return Ok(_mapper.Map<JelovnikDTORead>(j));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        /// <summary>
        /// Dodaje novu stavku jelovnika u bazu podataka.
        /// </summary>
        /// <param name="dto">Podaci o stavci jelovnika.</param>
        /// <returns>DTO kreirane stavke jelovnika.</returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(JelovnikDTORead))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<JelovnikDTORead>> Post(JelovnikDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }

            try
            {
                var j = _mapper.Map<Jelovnik>(dto);
                _context.Jelovnik.Add(j);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(Get), new { sifra = j.Sifra }, _mapper.Map<JelovnikDTORead>(j));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        /// <summary>
        /// Ažurira stavku jelovnika prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra stavke jelovnika.</param>
        /// <param name="dto">Podaci o stavci jelovnika.</param>
        /// <returns>Status ažuriranja.</returns>
        [HttpPut("{sifra:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Put(int sifra, JelovnikDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }

            try
            {
                var j = await _context.Jelovnik.FindAsync(sifra);

                if (j == null)
                {
                    return NotFound(new { poruka = $"Stavka jelovnika sa šifrom {sifra} ne postoji." });
                }

                _mapper.Map(dto, j);
                _context.Entry(j).State = EntityState.Modified;

                await _context.SaveChangesAsync();

                return Ok(new { poruka = "Stavka jelovnika uspješno ažurirana." });
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _context.Jelovnik.AnyAsync(j => j.Sifra == sifra))
                {
                    return NotFound(new { poruka = $"Stavka jelovnika sa šifrom {sifra} ne postoji." });
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, new { poruka = "Došlo je do greške prilikom ažuriranja." });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        /// <summary>
        /// Briše stavku jelovnika prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra stavke jelovnika.</param>
        /// <returns>Status brisanja.</returns>
        [HttpDelete("{sifra:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Delete(int sifra)
        {
            try
            {
                var j = await _context.Jelovnik.FindAsync(sifra);

                if (j == null)
                {
                    return NotFound(new { poruka = $"Stavka jelovnika sa šifrom {sifra} ne postoji." });
                }

                _context.Jelovnik.Remove(j);
                await _context.SaveChangesAsync();

                return Ok(new { poruka = "Stavka jelovnika uspješno obrisana." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        /// <summary>
        /// Postavlja sliku za polaznika.
        /// </summary>
        /// <param name="sifra">Šifra polaznika.</param>
        /// <param name="slika">Podaci o slici.</param>
        /// <returns>Status postavljanja slike.</returns>
        [HttpPut]
        [Route("postaviSliku/{sifra:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PostaviSliku(int sifra, SlikaDTO slika)
        {
            if (sifra <= 0)
            {
                return BadRequest("Šifra mora biti veća od nula (0)");
            }
            if (slika.Base64 == null || slika.Base64?.Length == 0)
            {
                return BadRequest("Slika nije postavljena");
            }
            var p = await _context.Jelovnik.FindAsync(sifra); // Upotreba async metode
            if (p == null)
            {
                return BadRequest("Ne postoji polaznik s šifrom " + sifra + ".");
            }
            try
            {
                var ds = Path.DirectorySeparatorChar;
                string dir = Path.Combine(Directory.GetCurrentDirectory()
                    + ds + "wwwroot" + ds + "slike" + ds + "jelovnik");

                if (!System.IO.Directory.Exists(dir))
                {
                    System.IO.Directory.CreateDirectory(dir);
                }
                var putanja = Path.Combine(dir + ds + sifra + ".png");
                await System.IO.File.WriteAllBytesAsync(putanja, Convert.FromBase64String(slika.Base64!)); // Upotreba async metode
                return Ok("Uspješno pohranjena slika");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
using AutoMapper;
using Backend.Data;
using Backend.Models;
using Backend.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    /// <summary>
    /// Kontroler za upravljanje stolovima u aplikaciji.
    /// </summary>
    /// <param name="context">Kontekst baze podataka.</param>
    /// <param name="mapper">Mapper za mapiranje objekata.</param>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class StolController(BackendContext context, IMapper mapper) : BackendController(context, mapper)
    {
        /// <summary>
        /// Dohvaća sve stolove.
        /// </summary>
        /// <returns>Lista DTO-ova stolova.</returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<StolDTORead>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<StolDTORead>>> Get()
        {
            try
            {
                var s = await _context.Stolovi.ToListAsync();
                return Ok(_mapper.Map<IEnumerable<StolDTORead>>(s));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        /// <summary>
        /// Dohvaća stol prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra stola.</param>
        /// <returns>DTO stola.</returns>
        [HttpGet("{sifra:int}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(StolDTORead))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<StolDTORead>> Get(int sifra)
        {
            try
            {
                var s = await _context.Stolovi.FindAsync(sifra);

                if (s == null)
                {
                    return NotFound(new { poruka = $"Stol sa šifrom {sifra} ne postoji." });
                }

                return Ok(_mapper.Map<StolDTORead>(s));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        /// <summary>
        /// Dodaje novi stol u bazu podataka.
        /// </summary>
        /// <param name="dto">Podaci o stolu.</param>
        /// <returns>DTO kreiranog stola.</returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(StolDTORead))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<StolDTORead>> Post(StolDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }

            try
            {
                var s = _mapper.Map<Stol>(dto);
                _context.Stolovi.Add(s);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(Get), new { sifra = s.Sifra }, _mapper.Map<StolDTORead>(s));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        /// <summary>
        /// Ažurira stol prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra stola.</param>
        /// <param name="dto">Podaci o stolu.</param>
        /// <returns>Status ažuriranja.</returns>
        [HttpPut("{sifra:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Put(int sifra, StolDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }

            try
            {
                var s = await _context.Stolovi.FindAsync(sifra);

                if (s == null)
                {
                    return NotFound(new { poruka = $"Stol sa šifrom {sifra} ne postoji." });
                }

                _mapper.Map(dto, s);
                _context.Entry(s).State = EntityState.Modified;

                await _context.SaveChangesAsync();

                return Ok(new { poruka = "Stol uspješno ažuriran." });
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _context.Stolovi.AnyAsync(s => s.Sifra == sifra))
                {
                    return NotFound(new { poruka = $"Stol sa šifrom {sifra} ne postoji." });
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
        /// Briše stol prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra stola.</param>
        /// <returns>Status brisanja.</returns>
        [HttpDelete("{sifra:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Delete(int sifra)
        {
            try
            {
                var s = await _context.Stolovi.FindAsync(sifra);

                if (s == null)
                {
                    return NotFound(new { poruka = $"Stol sa šifrom {sifra} ne postoji." });
                }

                _context.Stolovi.Remove(s);
                await _context.SaveChangesAsync();

                return Ok(new { poruka = "Stol uspješno obrisan." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }
    }
}
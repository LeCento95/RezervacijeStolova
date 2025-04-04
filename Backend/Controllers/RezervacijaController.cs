using AutoMapper;
using Backend.Data;
using Backend.Models;
using Backend.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    /// <summary>
    /// Kontroler za upravljanje rezervacijama u aplikaciji.
    /// </summary>
    /// <param name="context">Kontekst baze podataka.</param>
    /// <param name="mapper">Mapper za mapiranje objekata.</param>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class RezervacijaController(BackendContext context, IMapper mapper) : BackendController(context, mapper)
    {
        /// <summary>
        /// Dohvaća sve rezervacije.
        /// </summary>
        /// <returns>Lista DTO-ova rezervacija.</returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<RezervacijaDTORead>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<IEnumerable<RezervacijaDTORead>> Get()
        {
            try
            {
                var rez = _context.Rezervacije
                    .Include(r => r.Gost)
                    .Include(r => r.Stol)
                    .ToList();

                return Ok(_mapper.Map<IEnumerable<RezervacijaDTORead>>(rez));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        /// <summary>
        /// Dohvaća rezervaciju prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra rezervacije.</param>
        /// <returns>DTO rezervacije.</returns>
        [HttpGet("{sifra:int}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(RezervacijaDTORead))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<RezervacijaDTOInsertUpdate>> Get(int sifra)
        {
            try
            {
                var rez = await _context.Rezervacije
                    .Include(r => r.Gost)
                    .Include(r => r.Stol)
                    .FirstOrDefaultAsync(r => r.Sifra == sifra);

                if (rez == null)
                {
                    return NotFound(new { poruka = $"Rezervacija sa šifrom {sifra} ne postoji." });
                }

                return Ok(_mapper.Map<RezervacijaDTOInsertUpdate>(rez));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        /// <summary>
        /// Dodaje novu rezervaciju u bazu podataka.
        /// </summary>
        /// <param name="dto">Podaci o rezervaciji.</param>
        /// <returns>DTO kreirane rezervacije.</returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(RezervacijaDTORead))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<RezervacijaDTORead>> Post(RezervacijaDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }

            var g = await _context.Gosti.FindAsync(dto.GostSifra);
            if (g == null)
            {
                return BadRequest(new { poruka = $"Gost sa šifrom {dto.GostSifra} ne postoji." });
            }

            var s = await _context.Stolovi.FindAsync(dto.StolSifra);
            if (s == null)
            {
                return BadRequest(new { poruka = $"Stol sa šifrom {dto.StolSifra} ne postoji." });
            }

            try
            {
                var rez = _mapper.Map<Rezervacija>(dto);
                rez.Gost = g;
                rez.Stol = s;

                _context.Rezervacije.Add(rez);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(Get), new { sifra = rez.Sifra }, _mapper.Map<RezervacijaDTORead>(rez));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        /// <summary>
        /// Ažurira rezervaciju prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra rezervacije.</param>
        /// <param name="dto">Podaci o rezervaciji.</param>
        /// <returns>Status ažuriranja.</returns>
        [HttpPut("{sifra:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Put(int sifra, RezervacijaDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }

            try
            {
                var rez = await _context.Rezervacije
                    .Include(r => r.Gost)
                    .Include(r => r.Stol)
                    .FirstOrDefaultAsync(r => r.Sifra == sifra);

                if (rez == null)
                {
                    return NotFound(new { poruka = $"Rezervacija sa šifrom {sifra} ne postoji." });
                }

                var g = await _context.Gosti.FindAsync(dto.GostSifra);
                if (g == null)
                {
                    return BadRequest(new { poruka = $"Gost sa šifrom {dto.GostSifra} ne postoji." });
                }

                var s = await _context.Stolovi.FindAsync(dto.StolSifra);
                if (s == null)
                {
                    return BadRequest(new { poruka = $"Stol sa šifrom {dto.StolSifra} ne postoji." });
                }

                _mapper.Map(dto, rez);
                rez.Gost = g;
                rez.Stol = s;

                _context.Entry(rez).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return Ok(new { poruka = "Rezervacija uspješno ažurirana." });
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _context.Rezervacije.AnyAsync(r => r.Sifra == sifra))
                {
                    return NotFound(new { poruka = $"Rezervacija sa šifrom {sifra} ne postoji." });
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
        /// Briše rezervaciju prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra rezervacije.</param>
        /// <returns>Status brisanja.</returns>
        [HttpDelete("{sifra:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Delete(int sifra)
        {
            try
            {
                var rez = await _context.Rezervacije.FindAsync(sifra);

                if (rez == null)
                {
                    return NotFound(new { poruka = $"Rezervacija sa šifrom {sifra} ne postoji." });
                }

                _context.Rezervacije.Remove(rez);
                await _context.SaveChangesAsync();

                return Ok(new { poruka = "Rezervacija uspješno obrisana." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }
    }
}
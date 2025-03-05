using AutoMapper;
using Backend.Data;
using Backend.Models;
using Backend.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    /// <summary>
    /// Kontroler za upravljanje narudžbama u aplikaciji.
    /// </summary>
    /// <param name="context">Kontekst baze podataka.</param>
    /// <param name="mapper">Mapper za mapiranje objekata.</param>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class NarudzbaController(BackendContext context, IMapper mapper) : BackendController(context, mapper)
    {
        /// <summary>
        /// Dohvaća sve narudžbe.
        /// </summary>
        /// <returns>Lista DTO-ova narudžbi.</returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<NarudzbaDTORead>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<IEnumerable<NarudzbaDTORead>> Get()
        {
            try
            {
                var n = _context.Narudzbe
                    .Include(n => n.Jelovnik)
                    .Include(n=>n.Rezervacija).ThenInclude(r=>r.Gost).
                    ToList();
                //Console.WriteLine(n.Count);
                return Ok(_mapper.Map<IEnumerable<NarudzbaDTORead>>(n));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        /// <summary>
        /// Dohvaća narudžbu prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra narudžbe.</param>
        /// <returns>DTO narudžbe.</returns>
        [HttpGet("{sifra:int}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(NarudzbaDTORead))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<NarudzbaDTORead>> Get(int sifra)
        {
            try
            {
                var n = await _context.Narudzbe.FindAsync(sifra);

                if (n == null)
                {
                    return NotFound(new { poruka = $"Narudžba sa šifrom {sifra} ne postoji." });
                }

                return Ok(_mapper.Map<NarudzbaDTORead>(n));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        /// <summary>
        /// Dodaje novu narudžbu u bazu podataka.
        /// </summary>
        /// <param name="dto">Podaci o narudžbi.</param>
        /// <returns>DTO kreirane narudžbe.</returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(NarudzbaDTORead))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<NarudzbaDTORead>> Post(NarudzbaDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }

            try
            {
                var n = _mapper.Map<Narudzba>(dto);
                _context.Narudzbe.Add(n);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(Get), new { sifra = n.Sifra }, _mapper.Map<NarudzbaDTORead>(n));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        /// <summary>
        /// Ažurira narudžbu prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra narudžbe.</param>
        /// <param name="dto">Podaci o narudžbi.</param>
        /// <returns>Status ažuriranja.</returns>
        [HttpPut("{sifra:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Put(int sifra, NarudzbaDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }

            try
            {
                var n = await _context.Narudzbe.FindAsync(sifra);

                if (n == null)
                {
                    return NotFound(new { poruka = $"Narudžba sa šifrom {sifra} ne postoji." });
                }

                _mapper.Map(dto, n); 
                _context.Entry(n).State = EntityState.Modified;

                await _context.SaveChangesAsync();

                return Ok(new { poruka = "Narudžba uspješno ažurirana." });
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _context.Narudzbe.AnyAsync(n => n.Sifra == sifra))
                {
                    return NotFound(new { poruka = $"Narudžba sa šifrom {sifra} ne postoji." });
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
        /// Briše narudžbu prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra narudžbe.</param>
        /// <returns>Status brisanja.</returns>
        [HttpDelete("{sifra:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Delete(int sifra)
        {
            try
            {
                var n = await _context.Narudzbe.FindAsync(sifra);

                if (n == null)
                {
                    return NotFound(new { poruka = $"Narudžba sa šifrom {sifra} ne postoji." });
                }

                _context.Narudzbe.Remove(n);
                await _context.SaveChangesAsync();

                return Ok(new { poruka = "Narudžba uspješno obrisana." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }
    }
}
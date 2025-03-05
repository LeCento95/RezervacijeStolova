using AutoMapper;
using Backend.Data;
using Backend.Models;
using Backend.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace Backend.Controllers
{
    /// <summary>
    /// Kontroler za upravljanje gostima u aplikaciji.
    /// </summary>
    /// <param name="context">Kontekst baze podataka.</param>
    /// <param name="mapper">Mapper za mapiranje objekata.</param>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class GostController(BackendContext context, IMapper mapper) : BackendController(context, mapper)
    {
        /// <summary>
        /// Dohvaća sve goste.
        /// </summary>
        /// <returns>Lista DTO-ova gostiju.</returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<GostDTORead>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<GostDTORead>>> Get()
        {
            try
            {
                var g = await _context.Gosti.ToListAsync();
                return Ok(_mapper.Map<IEnumerable<GostDTORead>>(g));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        /// <summary>
        /// Dohvaća gosta prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra gosta.</param>
        /// <returns>DTO gosta.</returns>
        [HttpGet("{sifra:int}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(GostDTORead))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<GostDTORead>> Get(int sifra)
        {
            try
            {
                var g = await _context.Gosti.FindAsync(sifra);

                if (g == null)
                {
                    return NotFound(new { poruka = $"Gost sa šifrom {sifra} ne postoji." });
                }

                return Ok(_mapper.Map<GostDTORead>(g));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        /// <summary>
        /// Dodaje novog gosta u bazu podataka.
        /// </summary>
        /// <param name="dto">Podaci o gostu.</param>
        /// <returns>DTO kreiranog gosta.</returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(GostDTORead))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<GostDTORead>> Post(GostDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }

            try
            {
                var g = _mapper.Map<Gost>(dto);
                _context.Gosti.Add(g);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(Get), new { sifra = g.Sifra }, _mapper.Map<GostDTORead>(g));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        /// <summary>
        /// Ažurira gosta prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra gosta.</param>
        /// <param name="dto">Podaci o gostu.</param>
        /// <returns>Status ažuriranja.</returns>
        [HttpPut("{sifra:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Put(int sifra, GostDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }

            try
            {
                var g = await _context.Gosti.FindAsync(sifra);

                if (g == null)
                {
                    return NotFound(new { poruka = $"Gost sa šifrom {sifra} ne postoji." });
                }

                _mapper.Map(dto, g);
                _context.Entry(g).State = EntityState.Modified;

                await _context.SaveChangesAsync();

                return Ok(new { poruka = "Gost uspješno ažuriran." });
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _context.Gosti.AnyAsync(g => g.Sifra == sifra))
                {
                    return NotFound(new { poruka = $"Gost sa šifrom {sifra} ne postoji." });
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
        /// Briše gosta prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra gosta.</param>
        /// <returns>Status brisanja.</returns>
        [HttpDelete("{sifra:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Delete(int sifra)
        {
            try
            {
                var g = await _context.Gosti.FindAsync(sifra);

                if (g == null)
                {
                    return NotFound(new { poruka = $"Gost sa šifrom {sifra} ne postoji." });
                }

                _context.Gosti.Remove(g);
                await _context.SaveChangesAsync();

                return Ok(new { poruka = "Gost uspješno obrisan." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }
    }
}
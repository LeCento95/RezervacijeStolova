using AutoMapper;
using Backend.Data;
using Backend.Models;
using Backend.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    /// <summary>
    /// Kontroler za početne operacije rezervaije stolova.
    /// </summary>
    /// <param name="_context">Kontekst baze podataka.</param>
    /// <param name="_mapper">Mapira podatke.</param>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class RezervacijeStolovaController(BackendContext _context, IMapper _mapper) : ControllerBase
    {
        /// <summary>
        /// Dohvaća rezervaciju po šifri.
        /// </summary>
        /// <param name="sifra">Šifra rezervacije.</param>
        /// <returns>Dohvaća podatke o rezervaciji po šifri.</returns>
        /// <response code="200">Vraća traženu rezervaciju.</response>
        /// <response code="404">Rezervacija s traženom šifrom ne postoji.</response>
        /// <response code="400">Neispravan zahtjev.</response>
        [HttpGet]
        [Route("rezervacijaPoSifri/{sifra:int}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(RezervacijaDTORead))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<RezervacijaDTORead>> GetRezervacijaPoSifri(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }

            Rezervacija? rezervacija;
            try
            {
                rezervacija = await _context.Rezervacije
                    .Include(r => r.Stol)
                    .Include(r => r.Gost)
                    .FirstOrDefaultAsync(r => r.Sifra == sifra);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

            if (rezervacija == null)
            {
                return NotFound(new { poruka = "Rezervacija ne postoji u bazi" });
            }

            return Ok(_mapper.Map<RezervacijaDTORead>(rezervacija));
        }

        /// <summary>
        /// Dohvaća stranicu rezervacija.
        /// </summary>
        /// <param name="stranica">Broj stranice.</param>
        /// <returns>Vraća stranicu rezervacija.</returns>
        /// <response code="200">Vraća listu rezervacija za traženu stranicu.</response>
        /// <response code="400">Neispravan zahtjev.</response>
        [HttpGet]
        [Route("traziStranicenjeRezervacija/{stranica}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<RezervacijaDTORead>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> TraziStranicenjeRezervacija(int stranica)
        {
            if (stranica < 1)
            {
                return BadRequest("Broj stranice mora biti 1 ili veći");
            }

            var poStranici = 4;
            try
            {
                var rezervacije = await _context.Rezervacije
                    .Include(r => r.Stol)
                    .Include(r => r.Gost)
                    .Skip((stranica - 1) * poStranici)
                    .Take(poStranici)
                    .ToListAsync();

                if (!rezervacije.Any())
                {
                    return Ok(new
                    {
                        Poruka = "Trenutačno nema rezervacija.",
                        Rezervacije = new List<RezervacijaDTORead>(),
                    });
                }

                return Ok(new
                {
                    Rezervacije = _mapper.Map<IEnumerable<RezervacijaDTORead>>(rezervacije),
                });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>
        /// Izračunava ukupan broj stranica za rezervacije.
        /// </summary>
        /// <returns>Vraća ukupan broj stranica.</returns>
        /// <response code="200">Vraća ukupan broj stranica.</response>
        /// <response code="400">Neispravan zahtjev.</response>
        [HttpGet]
        [Route("izracunajUkupnoStranicaRezervacije/")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(int))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> IzracunajUkupnoStranicaRezervacije()
        {
            var poStranici = 4;
            try
            {
                var ukupniBrojRezervacija = await _context.Rezervacije.CountAsync();

                var ukupnoStranica = (int)Math.Ceiling((double)ukupniBrojRezervacija / poStranici);

                return Ok(ukupnoStranica);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>
        /// Dohvaća listu slobodnih stolova.
        /// </summary>
        /// <returns>Vraća listu slobodnih stolova.</returns>
        /// <response code="200">Vraća listu slobodnih stolova.</response>
        /// <response code="400">Neispravan zahtjev.</response>
        [HttpGet]
        [Route("traziSlobodneStolove")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<StolDTORead>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> TraziSlobodneStolove()
        {
            try
            {
                var slobodniStolovi = await _context.Stolovi.ToListAsync();
                return Ok(_mapper.Map<IEnumerable<StolDTORead>>(slobodniStolovi));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
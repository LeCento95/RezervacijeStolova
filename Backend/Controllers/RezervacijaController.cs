using AutoMapper;
using Backend.Data;
using Backend.Models;
using Backend.Models.DTO;
using Microsoft.AspNetCore.Mvc;

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
        [HttpGet]
        public ActionResult<List<RezervacijaDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<RezervacijaDTORead>>(_context.Rezervacije));
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
        /// <returns>Rezervacija.</returns>
        [HttpGet]
        [Route("{sifra:int}")]
        public ActionResult<RezervacijaDTORead> GetBySifra(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            Rezervacija? e;
            try
            {
                e = _context.Rezervacije.Find(sifra);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Rezervacija ne postoji u bazi" });
            }

            return Ok(_mapper.Map<RezervacijaDTORead>(e));
        }

        /// <summary>
        /// Dodaje novu rezervaciju u bazu podataka.
        /// </summary>
        /// <param name="dto">Podaci o rezervaciji.</param>
        /// <returns>Status kreiranja.</returns>
        [HttpPost]
        public IActionResult Post(RezervacijaDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                var e = _mapper.Map<Rezervacija>(dto);
                _context.Rezervacije.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<RezervacijaDTORead>(e));
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
        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, RezervacijaDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Rezervacija? e;
                try
                {
                    e = _context.Rezervacije.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Rezervacija ne postoji u bazi" });
                }
                e = _mapper.Map(dto, e);

                _context.Rezervacije.Update(e);
                _context.SaveChanges();

                return Ok(new { poruka = "Uspješno promijenjeno" });
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
        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Rezervacija? e;
                try
                {
                    e = _context.Rezervacije.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound("Rezervacija ne postoji u bazi");
                }
                _context.Rezervacije.Remove(e);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno obrisano" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }
    }
}
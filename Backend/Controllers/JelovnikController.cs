using AutoMapper;
using Backend.Data;
using Backend.Models;
using Backend.Models.DTO;
using Microsoft.AspNetCore.Mvc;

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
        [HttpGet]
        public ActionResult<List<JelovnikDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<JelovnikDTORead>>(_context.Jelovnik));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        /// <summary>
        /// Dohvaća jelo iz jelovnika prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra jela.</param>
        /// <returns>Jelo iz jelovnika.</returns>
        [HttpGet]
        [Route("{sifra:int}")]
        public ActionResult<JelovnikDTORead> GetBySifra(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            Jelovnik? e;
            try
            {
                e = _context.Jelovnik.Find(sifra);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Jelo ne postoji u jelovniku" });
            }

            return Ok(_mapper.Map<JelovnikDTORead>(e));
        }

        /// <summary>
        /// Dodaje novo jelo u jelovnik.
        /// </summary>
        /// <param name="dto">Podaci o jelu.</param>
        /// <returns>Status kreiranja.</returns>
        [HttpPost]
        public IActionResult Post(JelovnikDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                var e = _mapper.Map<Jelovnik>(dto);
                _context.Jelovnik.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<JelovnikDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        /// <summary>
        /// Ažurira jelo u jelovniku prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra jela.</param>
        /// <param name="dto">Podaci o jelu.</param>
        /// <returns>Status ažuriranja.</returns>
        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, JelovnikDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Jelovnik? e;
                try
                {
                    e = _context.Jelovnik.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Jelo ne postoji u jelovniku" });
                }
                e = _mapper.Map(dto, e);

                _context.Jelovnik.Update(e);
                _context.SaveChanges();

                return Ok(new { poruka = "Uspješno promijenjeno" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        /// <summary>
        /// Briše jelo iz jelovnika prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra jela.</param>
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
                Jelovnik? e;
                try
                {
                    e = _context.Jelovnik.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound("Jelo ne postoji u jelovniku");
                }
                _context.Jelovnik.Remove(e);
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
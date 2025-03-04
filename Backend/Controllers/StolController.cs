using AutoMapper;
using Backend.Data;
using Backend.Models;
using Backend.Models.DTO;
using Microsoft.AspNetCore.Mvc;

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
        /// <returns>Lista stolova.</returns>     
        [HttpGet]
        public ActionResult<List<StolDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<StolDTORead>>(_context.Stolovi));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        /// <summary>
        /// Dohvaća stolove prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra stola.</param>
        /// <returns>Stol.</returns>
        [HttpGet]
        [Route("{sifra:int}")]
        public ActionResult<StolDTORead> GetBySifra(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            Stol? e;
            try
            {
                e = _context.Stolovi.Find(sifra);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Stol ne postoji u bazi" });
            }

            return Ok(_mapper.Map<StolDTORead>(e));
        }

        /// <summary>
        /// Dodaje novi stol.
        /// </summary>
        /// <param name="dto">Podaci o stolu.</param>
        /// <returns>Status kreiranja.</returns>
        [HttpPost]
        public IActionResult Post(StolDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                var e = _mapper.Map<Stol>(dto);
                _context.Stolovi.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<StolDTORead>(e));
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
        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, StolDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Stol? e;
                try
                {
                    e = _context.Stolovi.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Stol ne postoji u bazi" });
                }
                e = _mapper.Map(dto, e);

                _context.Stolovi.Update(e);
                _context.SaveChanges();

                return Ok(new { poruka = "Uspješno promijenjeno" });
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
                Stol? e;
                try
                {
                    e = _context.Stolovi.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound("Stol ne postoji u bazi");
                }
                _context.Stolovi.Remove(e);
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
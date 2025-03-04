using AutoMapper;
using Backend.Data;
using Backend.Models;
using Backend.Models.DTO;
using Microsoft.AspNetCore.Mvc;

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
        [HttpGet]
        public ActionResult<List<NarudzbaDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<NarudzbaDTORead>>(_context.Narudzbe));
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
        /// <returns>Narudžba.</returns>
        [HttpGet]
        [Route("{sifra:int}")]
        public ActionResult<NarudzbaDTORead> GetBySifra(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            Narudzba? e;
            try
            {
                e = _context.Narudzbe.Find(sifra);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Narudžba ne postoji u bazi" });
            }

            return Ok(_mapper.Map<NarudzbaDTORead>(e));
        }

        /// <summary>
        /// Dodaje novu narudžbu u bazu podataka.
        /// </summary>
        /// <param name="dto">Podaci o narudžbi.</param>
        /// <returns>Status kreiranja.</returns>
        [HttpPost]
        public IActionResult Post(NarudzbaDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                var e = _mapper.Map<Narudzba>(dto);
                _context.Narudzbe.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<NarudzbaDTORead>(e));
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
        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, NarudzbaDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Narudzba? e;
                try
                {
                    e = _context.Narudzbe.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Narudžba ne postoji u bazi" });
                }
                e = _mapper.Map(dto, e);

                _context.Narudzbe.Update(e);
                _context.SaveChanges();

                return Ok(new { poruka = "Uspješno promijenjeno" });
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
                Narudzba? e;
                try
                {
                    e = _context.Narudzbe.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound("Narudžba ne postoji u bazi");
                }
                _context.Narudzbe.Remove(e);
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
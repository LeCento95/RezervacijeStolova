﻿using AutoMapper;
using Backend.Data;
using Backend.Models;
using Backend.Models.DTO;
using Microsoft.AspNetCore.Mvc;


namespace Backend.Controllers
{

    /// <summary>
    /// Kontroler za upravljanje gostima u aplikaciji .
    /// </summary>
    /// <param name="context">Kontekst baze podataka.</param>
    /// <param name="mapper">Mapper za mapiranje objekata.</param>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class GostController(BackendContext context, IMapper mapper) : BackendController(context, mapper)
    {

        [HttpGet]
        public ActionResult<List<GostDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<GostDTORead>>(_context.Gosti));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

        }

        /// <summary>
        /// Dohvaća goste prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra gosta.</param>
        /// <returns>Gost.</returns>
        [HttpGet]
        [Route("{sifra:int}")]
        public ActionResult<GostDTORead> GetBySifra(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            Gost? e;
            try
            {
                e = _context.Gosti.Find(sifra);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Gost ne postoji u bazi" });
            }

            return Ok(_mapper.Map<GostDTORead>(e));
        }


        /// <summary>
        /// Dodaje novog gosta u bazu podataka.
        /// </summary>
        /// <param name="dto">Podaci o gostu</param>
        /// <returns>Status kreiranja.</returns>
        [HttpPost]
        public IActionResult Post(GostDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                var e = _mapper.Map<Gost>(dto);
                _context.Gosti.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<GostDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }



        }


        /// <summary>
        /// Ažurira gosta prema šifri.
        /// </summary>
        /// <param name="sifra">šifra gosta.</param>
        /// <param name="dto">Podaci o gostu.</param>
        /// <returns>Status ažuriranja.</returns>
        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, GostDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Gost? e;
                try
                {
                    e = _context.Gosti.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Gost ne postoji u bazi" });
                }
                e = _mapper.Map(dto, e);

                _context.Gosti.Update(e);
                _context.SaveChanges();

                return Ok(new { poruka = "Uspješno promijenjeno" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="sifra">Šifra gosta.</param>
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
                Gost? e;
                try
                {
                    e = _context.Gosti.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound("Gost ne postoji u bazi");
                }
                _context.Gosti.Remove(e);
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

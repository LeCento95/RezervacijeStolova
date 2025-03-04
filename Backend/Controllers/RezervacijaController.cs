﻿using AutoMapper;
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
        public async Task<ActionResult<IEnumerable<RezervacijaDTORead>>> Get()
        {
            try
            {
                var r = await _context.Rezervacije.ToListAsync();
                return Ok(_mapper.Map<IEnumerable<RezervacijaDTORead>>(r));
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
        public async Task<ActionResult<RezervacijaDTORead>> Get(int sifra)
        {
            try
            {
                var r = await _context.Rezervacije.FindAsync(sifra);

                if (r == null)
                {
                    return NotFound(new { poruka = $"Rezervacija sa šifrom {sifra} ne postoji." });
                }

                return Ok(_mapper.Map<RezervacijaDTORead>(r));
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

            try
            {
                var r = _mapper.Map<Rezervacija>(dto);
                _context.Rezervacije.Add(r);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(Get), new { sifra = r.Sifra }, _mapper.Map<RezervacijaDTORead>(r));
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
                var r = await _context.Rezervacije.FindAsync(sifra);

                if (r == null)
                {
                    return NotFound(new { poruka = $"Rezervacija sa šifrom {sifra} ne postoji." });
                }

                _mapper.Map(dto, r);
                _context.Entry(r).State = EntityState.Modified;

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
                var r = await _context.Rezervacije.FindAsync(sifra);

                if (r == null)
                {
                    return NotFound(new { poruka = $"Rezervacija sa šifrom {sifra} ne postoji." });
                }

                _context.Rezervacije.Remove(r);
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
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]



    public class GostController: ControllerBase
    {
        private readonly BackendContext _context;

        public GostController(BackendContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_context.Gosti);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult Get(int sifra)
        {
            if (sifra <= 0)
            {
                return StatusCode(StatusCodes.Status404NotFound, new { poruka = "Šifra mora biti pozitivan broj" });
            }
            try
            {
                var gost = _context.Gosti.Find(sifra);
                if (gost == null)
                {
                    return NotFound(new { poruka = $"Gost s šifrom {sifra} ne postoji" });
                }
                return Ok(gost);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }



        [HttpPost]
        public IActionResult Post(Gost gost)
        {

            try
            {
                _context.Gosti.Add(gost);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, gost);



            }
            catch (Exception e)
            {

                return BadRequest(e);
            }




        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, Gost gost
            )

        {
            try
            {

                var g = _context.Gosti.Find(sifra);
                if (g == null)
                {
                    return NotFound(new { poruka = $"Gost s šifrom {sifra} ne postoji" });
                }

                //rucno mapiranje, kasnije automaper
                g.Ime =gost.Ime;
                g.Prezime = gost.Prezime;
                g.BrojTelefona = gost.BrojTelefona;
                g.Email = gost.Email;
                
                _context.Gosti.Update(g);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno ažurirano" });
            }
            catch (Exception e)
            {

                return BadRequest(e);
            }

        } 

        [HttpDelete]
        [Route("{sifra:int}")]
        public IActionResult Delete(int sifra)
        {
            if (sifra <= 0)
            {
                return StatusCode(StatusCodes.Status404NotFound, new { poruka = "Šifra mora biti pozitivan broj" });
            }
            try
            {
                var gost = _context.Gosti.Find(sifra);
                if (gost == null)
                {
                    return NotFound(new { poruka = $"Gost s šifrom {sifra} ne postoji" });
                }
                _context.Gosti.Remove(gost);
                _context.SaveChanges();
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }




    }
}


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
        public IActionResult GetBySifra(int sifra)
        {
            try
            {
                var s = _context.Gosti.Find(sifra);
                if (s == null)
                {
                    return NotFound();
                }
                return Ok(s);
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

                var s = _context.Gosti.Find(sifra);
                if (s == null)
                {
                    return NotFound();
                }
                //rucno mapiranje, kasnije automaper
                s.Ime =gost.Ime;
                s.Prezime = gost.Prezime;
                s.BrojTelefon = gost.BrojTelefon;
                s.Email = gost.Email;
                _context.Gosti.Update(s);
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
            try
            {
                var s = _context.Gosti.Find(sifra);
                if (s == null)
                {
                    return NotFound();
                }
                _context.Gosti.Remove(s);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno obrisano" });
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }




    }
}


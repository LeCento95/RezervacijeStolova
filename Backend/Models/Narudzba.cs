using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Narudzba : Entitet
    {
    
        [ForeignKey("rezervacija")]
        public required Rezervacija Rezervacija { get; set; }

        [ForeignKey("jelo")]
        public required Jelovnik Jelovnik { get; set; }


        public int Kolicina { get; set; }


    }
}

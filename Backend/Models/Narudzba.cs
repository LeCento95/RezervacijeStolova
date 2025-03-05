using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Narudzba : Entitet
    {
        

        [ForeignKey("Rezervacija")]
        public int Rezervacija { get; set; }

        [ForeignKey("Jelovnik")]
        public int Jelo { get; set; }

        public int Kolicina { get; set; }


    }
}

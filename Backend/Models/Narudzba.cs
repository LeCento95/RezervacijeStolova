using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Narudzba
    {
        public int Sifra { get; set; }

        [ForeignKey("Rezervacija")]
        public int Rezervacija { get; set; }

        [ForeignKey("Jelovnik")]
        public int Jelo { get; set; }

        public int Kolicina { get; set; }

        // Navigacijska svojstva
        public Rezervacija RezervacijaNavigation { get; set; }
        public Jelovnik JeloNavigation { get; set; }
    }
}

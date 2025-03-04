using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Rezervacija
    {
        public int Sifra { get; set; }
        
        [ForeignKey("Gost")]
        public int Gost { get; set; } // Vanjski ključ
        
        [ForeignKey("Stol")]
        public int Stol { get; set; } // Vanjski ključ
        
        [Column("datum_vrijeme")]
        public DateTime DatumVrijeme { get; set; }
        
        [Column("broj_osoba")]
        public int BrojOsoba { get; set; }
        public string? Napomena { get; set; } = "";

        // Navigacijska svojstva
        public Gost GostNavigation { get; set; }
        public Stol StolNavigation { get; set; }
        public ICollection<Narudzba> Narudzbe { get; set; } = new List<Narudzba>();
    }
}

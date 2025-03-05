using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Rezervacija : Entitet
    {
        
        
        [ForeignKey("Gost")]
        public int Gost { get; set; } // Vanjski ključ
        
        [ForeignKey("Stol")]
        public int Stol { get; set; } // Vanjski ključ
        
        [Column("datum_vrijeme")]
        public DateTime DatumVrijeme { get; set; }
        
        [Column("broj_osoba")]
        public int BrojOsoba { get; set; }
        public string? Napomena { get; set; } = "";

        public required ICollection<Narudzba> Narudzbe { get; set; }

        
    }
}

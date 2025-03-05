using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Rezervacija : Entitet
    {
        
        
        [ForeignKey("gost")]
        public required Gost Gost { get; set; } // Vanjski ključ
        
        [ForeignKey("stol")]
        public required Stol Stol { get; set; } // Vanjski ključ
        
        [Column("datum_vrijeme")]
        public DateTime DatumVrijeme { get; set; }
        
        [Column("broj_osoba")]
        public int BrojOsoba { get; set; }
        public string? Napomena { get; set; } = "";

 
        
    }
}

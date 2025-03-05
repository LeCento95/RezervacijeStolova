using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Stol : Entitet
    {
        [Column("broj_stola")]
        public int BrojStola { get; set; }
        public int Kapacitet { get; set; }
        [Column("lokacija")]
        public string? Lokacija { get; set; } = "";
        
    }
}

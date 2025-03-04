using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Stol : Entitet
    {
        [Column("broj_stola")]
        public int BrojStola { get; set; }
        public int Kapacitet { get; set; }
        public string? lokacija { get; set; } = "";
        public ICollection<Rezervacija> Rezervacije { get; set; } = new List<Rezervacija>();
    }
}

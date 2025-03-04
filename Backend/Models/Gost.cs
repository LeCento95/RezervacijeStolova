using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Gost : Entitet
    {
        public string? Ime { get; set; } = "";
        
        public string? Prezime { get; set; } = "";
        
        [Column("broj_telefona")]
        public string? BrojTelefona { get; set; } = "";
        
        [Column("e_mail")]
        public string? Email { get; set; } = "";
        
        public ICollection<Rezervacija> Rezervacije { get; set; } = new List<Rezervacija>();
    }
}

using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Jelovnik
    {
        public int Sifra { get; set; }
        [Column("naziv_jela")]
        public string NazivJela { get; set; } = "";
        public string Kategorija { get; set; } = "";
        public decimal Cijena { get; set; }

        // Navigacijska svojstva
        public ICollection<Narudzba> Narudzbe { get; set; } = new List<Narudzba>();

    }
}

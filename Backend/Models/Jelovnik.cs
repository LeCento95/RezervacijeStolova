using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Jelovnik : Entitet
    {
        
        [Column("naziv_jela")]
        public string NazivJela { get; set; } = "";
        
        public string Kategorija { get; set; } = "";
        
        public decimal Cijena { get; set; }

        

    }
}

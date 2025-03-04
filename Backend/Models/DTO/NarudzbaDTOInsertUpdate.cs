using System.ComponentModel.DataAnnotations;
using Microsoft.OpenApi.MicrosoftExtensions;

namespace Backend.Models.DTO
{

    /// <summary>
    /// DTO za unos i ažuriranje narudžbi.
    /// </summary>
    /// <param name="Rezervacija">Rezervacija je obavezna.</param>
    /// <param name="Jelo">Jelo je obavezno.</param>
    /// <param name="Kolicina">Količina je obavezna.</param>
    public record NarudzbaDTOInsertUpdate(

        [Required(ErrorMessage = "Rezuervacija je obavezna" )]
        int Rezervacija,

        [Required(ErrorMessage = "Jelo je obavezno")]
        int Jelo,

        [Required(ErrorMessage = "Kolicina je obavezna")]
        int Kolicina


    );
    
    
}

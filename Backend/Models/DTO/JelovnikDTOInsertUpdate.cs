using System.ComponentModel.DataAnnotations;
using Microsoft.OpenApi.MicrosoftExtensions;

namespace Backend.Models.DTO
{
    /// <summary>
    /// DTO za unos i ažuriranje jelovnika.
    /// </summary>
    /// <param name="NazivJela">Naziv jela obavezno.</param>
    /// <param name="Kategorija">Kategorija</param>
    /// <param name="Cijena"></param>
    public record JelovnikDTOInsertUpdate(
    
        [Required(ErrorMessage = "Naziv jela je obavezan")]
        string NazivJela,

        [Required(ErrorMessage = "Kategorija je obavezna")]
        string Kategorija,

        [Required(ErrorMessage = "Cijena je obavezna")]
        decimal Cijena
    );
}

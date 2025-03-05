using System.ComponentModel.DataAnnotations;
using Microsoft.OpenApi.MicrosoftExtensions;

namespace Backend.Models.DTO
{
    /// <summary>
    /// DTO za unos i ažuriranje podataka o jelovniku.
    /// </summary>
    /// <param name="NazivJela">Naziv jela (obavezno).</param>
    /// <param name="Kategorija">Kategorija jela (obavezno).</param>
    /// <param name="Cijena">Cijena jela (obavezno, veća od 0).</param>
    public record JelovnikDTOInsertUpdate(
        [Required(ErrorMessage = "Naziv jela je obavezan.")] 
        string NazivJela,
        
        [Required(ErrorMessage = "Kategorija je obavezna.")] 
        string Kategorija,
        
        [Required(ErrorMessage = "Cijena je obavezna.")][Range(0.01, double.MaxValue, ErrorMessage = "Cijena mora biti veća od 0.")] 
        decimal Cijena
    );
}

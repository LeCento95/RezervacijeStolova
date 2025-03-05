using System.ComponentModel.DataAnnotations;

namespace Backend.Models.DTO
{
    /// <summary>
    /// DTO za unos i ažuriranje podataka o stolu.
    /// </summary>
    /// <param name="BrojStola">Broj stola (obavezno, veći od 0).</param>
    /// <param name="Kapacitet">Kapacitet stola (obavezno, veći od 0).</param>
    /// <param name="Lokacija">Lokacija stola (opcionalno).</param>
    public record StolDTOInsertUpdate(
        [Required(ErrorMessage = "Broj stola je obavezan.")][Range(1, int.MaxValue, ErrorMessage = "Broj stola mora biti veći od 0.")] 
        int BrojStola,
        
        [Required(ErrorMessage = "Kapacitet je obavezan.")][Range(1, int.MaxValue, ErrorMessage = "Kapacitet mora biti veći od 0.")] 
        int Kapacitet,

        string Lokacija

     );
}
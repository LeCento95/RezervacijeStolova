using System.ComponentModel.DataAnnotations;

namespace Backend.Models.DTO
{
    /// <summary>
    /// DTO za unos i ažuriranje stola. 
    /// </summary>
    /// <param name="BrojStola">Broj stola (obavezno)</param>
    /// <param name="Kapacitet">Kapacitet (obavezno)</param>
    /// <param name="Lokacija">Lokacija (obavezna)</param>
    public record StolDTOInsertUpdate(
        [Required(ErrorMessage = "Broj stola je obavezan")]
        int BrojStola,
        
        [Required(ErrorMessage = "Kapacitet je obavezan")]
        int Kapacitet,
        
        [Required(ErrorMessage = "Lokacija je obavezna")]
        string Lokacija

    );
}
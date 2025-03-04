using System.ComponentModel.DataAnnotations;

namespace Backend.Models.DTO
{
    /// <summary>
    /// DTO za unos i ažuriranje rezervacija.
    /// </summary>
    /// <param name="Gost">Gost (obavezan).</param>
    /// <param name="Stol">Stol (obavezan).</param>
    /// <param name="DatumVrijeme">Datum i vrijeme obavezni.</param>
    /// <param name="BrojOsoba">Broj osoba obavezan.</param>
    /// <param name="Napomena"></param>
    public record RezervacijaDTOInsertUpdate(
            [Required(ErrorMessage = "Gost je obavezan")]
            int Gost,

            [Required(ErrorMessage = "Stol je obavezan")]
            int Stol,

            [Required(ErrorMessage = "Datum i vreme su obavezni")]
            DateTime DatumVrijeme,

            [Required(ErrorMessage = "Broj osoba je obavezan")]
            int BrojOsoba,

            string? Napomena = ""
        );
        
}


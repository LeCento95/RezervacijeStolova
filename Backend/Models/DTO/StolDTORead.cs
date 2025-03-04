using System.ComponentModel.DataAnnotations;

namespace Backend.Models.DTO
{
    /// <summary>
    /// DTO za čitanje podataka o stolu.    
    /// </summary>
    /// <param name="Sifra">Jedinstvena šifra stola.</param>
    /// <param name="BrojStola">Broj stola.</param>
    /// <param name="Kapacitet">Kapacitet.</param>
    /// <param name="Lokacija">Lokacija stola.</param>
    public record StolDTORead(
        int Sifra,

        int BrojStola,

        int Kapacitet,

        string Lokacija
    );
}
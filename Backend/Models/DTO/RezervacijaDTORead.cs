namespace Backend.Models.DTO
{

    /// <summary>
    /// DTO za čitanje podataka o rezervaciji.
    /// </summary>
    /// <param name="Sifra">Jedinstvena šifra rezervacije.</param>
    /// <param name="Gost">Šifra gosta.</param>
    /// <param name="Stol">Šifra stola.</param>
    /// <param name="DatumVrijeme">Datum i vrijeme rezervacije.</param>
    /// <param name="BrojOsoba">Broj osoba za rezervaciju.</param>
    /// <param name="Napomena">Napomena uz rezervaciju.</param>
    public record RezervacijaDTORead(
        int Sifra,

        int Gost,

        int Stol,

        DateTime DatumVrijeme,

        int BrojOsoba,

        string? Napomena

    );
}

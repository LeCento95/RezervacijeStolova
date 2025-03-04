namespace Backend.Models.DTO
{

    /// <summary>
    /// DTO za čitanje podataka o rezervaciji.   
    /// </summary>
    /// <param name="Sifra">Jedinstvena šifra rezrvacije.</param>
    /// <param name="Gost">Jedinstvena šifra gosta.</param>
    /// <param name="Stol">Jedinstvena šifra stola.</param>
    /// <param name="DatumVrijeme">Datum i vrijeme rezervacije.</param>
    /// <param name="BrojOsoba">Broj osoba za stolom.</param>
    /// <param name="Napomena">Ako je potreban npr. "baby chair"</param>
    public record RezervacijaDTORead(
        int Sifra,

        int Gost,

        int Stol,

        DateTime DatumVrijeme,

        int BrojOsoba,

        string? Napomena = ""
    );
}

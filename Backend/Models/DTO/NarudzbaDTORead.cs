namespace Backend.Models.DTO
{

    /// <summary>
    /// DTO za čitanje narudžbi.
    /// </summary>
    /// <param name="Sifra">Jedinstvena šifra narudžbi.</param>
    /// <param name="Rezervacija">Jedinstvena šifra rezervacije.</param>
    /// <param name="Jelo">Određena vrsta jela.</param>
    /// <param name="Kolicina">Količina naručenih jela.</param>
    public record NarudzbaDTORead(

        int Sifra,

        int Rezervacija,

        int Jelo,

        int Kolicina

        // Dodatna svojstva ako želite uključiti informacije iz navigacijskih svojstava
        // string NazivJela,
        // string ImeGosta,
        // DateTime DatumVrijemeRezervacije


        );
    
    
}

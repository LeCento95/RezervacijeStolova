namespace Backend.Models.DTO
{

    /// <summary>
    /// DTO za čitanje podataka o narudžbi.
    /// </summary>
    /// <param name="Sifra">Jedinstveni šifra narudžbe.</param>
    /// <param name="Rezervacija">Šifra rezervacije.</param>
    /// <param name="Jelo">Šifra jela.</param>
    /// <param name="Kolicina">Količina naručenog jela.</param>
    public record NarudzbaDTORead(

        int Sifra,

        RezervacijaDTORead Rezervacija,
        
        JelovnikDTORead Jelo,
        
        int Kolicina

        
        );
    
    
}

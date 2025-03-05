namespace Backend.Models.DTO
{

    /// <summary>
    /// DTO za čitanje podataka o jelovniku.
    /// </summary>
    /// <param name="Sifra">Jedinstveni identifikator jela.</param>
    /// <param name="NazivJela">Naziv jela.</param>
    /// <param name="Kategorija">Kategorija jela.</param>
    /// <param name="Cijena">Cijena jela.</param>
    public record JelovnikDTORead(
        int Sifra,

        string NazivJela,

        string Kategorija,

        decimal Cijena
    
        
   );
    
    
}

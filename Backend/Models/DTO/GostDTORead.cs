namespace Backend.Models.DTO
{

    /// <summary>
    /// DTO za čitanje podataka o gostu.
    /// </summary>
    /// <param name="Sifra">Jedinstvena šifra gosta.</param>
    /// <param name="Ime">Ime gosta.</param>
    /// <param name="Prezime">Prezime gosta.</param>
    /// <param name="BrojTelefona">Broj telefona gosta.</param>
    /// <param name="Email">E-mail adresa gosta.</param>
    public record GostDTORead(

        int Sifra,

        string? Ime,

        string? Prezime,

        string? BrojTelefona,

        string? Email
     );
}
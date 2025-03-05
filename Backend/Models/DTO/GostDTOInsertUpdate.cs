using System.ComponentModel.DataAnnotations;

namespace Backend.Models.DTO
{

    /// <summary>
    /// DTO za unos i ažuriranje gosta.
    /// </summary>
    /// <param name="Ime">Ime gosta (obavezno).</param>
    /// <param name="Prezime">Prezime gosta (obavezno).</param>
    /// <param name="BrojTelefona">Broj telefona (obavezno).</param>
    /// <param name="Email">Email gosta (obavezno, u ispravnom formatu).</param>
    public record GostDTOInsertUpdate(
     [Required(ErrorMessage = "Ime je obavezno.")] 
     string? Ime,
    
     [Required(ErrorMessage = "Prezime je obavezno.")] 
     string? Prezime,
     
     [Required(ErrorMessage = "Broj telefona je obavezan.")] 
     string? BrojTelefona,
     
     [Required(ErrorMessage = "Email je obavezan.")][EmailAddress(ErrorMessage = "Neispravan format email adrese.")] 
     string? Email
    );



}

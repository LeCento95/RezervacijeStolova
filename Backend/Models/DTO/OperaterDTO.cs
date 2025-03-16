using System.ComponentModel.DataAnnotations;

namespace Backend.Models.DTO
{
    /// <summary>
    /// DTO (Data Transfer Object) za operatera.
    /// </summary>
    /// <param name="Email"></param>
    /// <param name="Password"></param>
    public record OperaterDTO(
       [Required(ErrorMessage = "Email je obavezan.")]
            string Email,
       [Required(ErrorMessage = "Lozinka je obavezna.")]
            string Password);
}
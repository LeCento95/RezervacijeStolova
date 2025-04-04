﻿using System.ComponentModel.DataAnnotations;

namespace Backend.Models.DTO
{
    /// <summary>
    /// DTO za unos i ažuriranje podataka o rezervaciji.
    /// </summary>
    /// <param name="GostSifra">Šifra gosta (obavezno).</param>
    /// <param name="StolSifra">Šifra stola (obavezno).</param>
    /// <param name="DatumVrijeme">Datum i vrijeme rezervacije (obavezno).</param>
    /// <param name="BrojOsoba">Broj osoba za rezervaciju (obavezno, veći od 0).</param>
    /// <param name="Napomena">Napomena uz rezervaciju (opcionalno).</param>
    public record RezervacijaDTOInsertUpdate(
        [Required(ErrorMessage = "Gost je obavezan.")] 
        int GostSifra,
        
        [Required(ErrorMessage = "Stol je obavezan.")] 
        int StolSifra,
        
        [Required(ErrorMessage = "Datum i vrijeme su obavezni.")] 
        DateTime DatumVrijeme,
        
        [Required(ErrorMessage = "Broj osoba je obavezan.")][Range(1, int.MaxValue, ErrorMessage = "Broj osoba mora biti veći od 0.")] 
        int BrojOsoba,
        
        string Napomena = ""
    );

}


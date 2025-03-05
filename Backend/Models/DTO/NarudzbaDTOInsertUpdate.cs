﻿using System.ComponentModel.DataAnnotations;
using Microsoft.OpenApi.MicrosoftExtensions;

namespace Backend.Models.DTO
{

    /// <summary>
    /// DTO za unos i ažuriranje podataka o narudžbi.
    /// </summary>
    /// <param name="Rezervacija">Identifikator rezervacije (obavezno).</param>
    /// <param name="Jelo">Identifikator jela (obavezno).</param>
    /// <param name="Kolicina">Količina naručenog jela (obavezno, veća od 0).</param>
    public record NarudzbaDTOInsertUpdate(

     [Required(ErrorMessage = "Rezervacija je obavezna.")] 
     int RezervacijaSifra,
    
     
     [Required(ErrorMessage = "Količina je obavezna.")][Range(1, int.MaxValue, ErrorMessage = "Količina mora biti veća od 0.")] 
     int Kolicina


    );
    
    
}

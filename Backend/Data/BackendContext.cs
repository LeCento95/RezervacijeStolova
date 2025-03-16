using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class BackendContext : DbContext
    {
        /// <summary>
        /// Kontekst baze podataka za aplikaciju Udomi me.
        /// </summary>
        /// <remarks>
        /// Konstruktor koji prima opcije za konfiguraciju konteksta.
        /// </remarks>
        /// <param name="opcije">Opcije za konfiguraciju konteksta.</param>
        public BackendContext(DbContextOptions<BackendContext> options) : base(options)
        {
            // Ovdje se mogu dodati dodatne opcije ako je potrebno, ali u ovom slučaju su opcije proslijeđene putem parametra.
        }

        /// <summary>
        /// DbSet za entitet Gost. Predstavlja tablicu "Gosti" u bazi podataka.
        /// </summary>
        public DbSet<Gost> Gosti { get; set; }
        
        /// <summary>
        /// DbSet za entitet Stol. Predstavlja tablicu "Stolovi" u bazi podataka.
        /// </summary>
        public DbSet<Stol> Stolovi { get; set; }
        
        /// <summary>
        /// DbSet za entitet Rezervacija. Predstavlja tablicu "Rezervacije" u bazi podataka.
        /// </summary>
        public DbSet<Rezervacija> Rezervacije { get; set; }
        
        /// <summary>
        /// DbSet za entitet Narudzba. Predstavlja tablicu "Narudzbe" u bazi podataka.
        /// </summary>
        public DbSet<Narudzba> Narudzbe { get; set; }
        
        /// <summary>
        /// DbSet za entitet Jelovnik. Predstavlja tablicu "Jelovnik" u bazi podataka.
        /// </summary>
        public DbSet<Jelovnik> Jelovnik { get; set; }

        /// <summary>
        /// Skup podataka za entitet Operater.
        /// </summary>
        public DbSet<Operater> Operateri { get; set; }



    }
}
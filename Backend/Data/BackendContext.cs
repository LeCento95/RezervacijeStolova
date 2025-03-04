using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class BackendContext : DbContext
    {

        public BackendContext(DbContextOptions<BackendContext> options) : base(options)
        {
            // opcije mogu biti postavljene ako je potrebno
        }
 
        public DbSet<Gost> Gosti { get; set; } // Zbog ovog ovdje Gosti se tablica zove u množini
        public DbSet<Stol> Stolovi { get; set; } // Dodajem DbSet za Stolove
        public DbSet<Rezervacija> Rezervacije { get; set; } // Dodajem DbSet za Rezervacije
        public DbSet<Jelovnik> Jelovnik { get; set; } // Dodajem DbSet za Jelovnik
        public DbSet<Narudzba> Narudzbe { get; set; } // Dodajem DbSet za Narudzbe

    }
}

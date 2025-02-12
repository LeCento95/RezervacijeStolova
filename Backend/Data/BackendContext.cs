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

    }
}

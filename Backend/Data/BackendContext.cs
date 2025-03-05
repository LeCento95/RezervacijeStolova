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

        public DbSet<Gost> Gosti { get; set; }
        public DbSet<Stol> Stolovi { get; set; }
        public DbSet<Rezervacija> Rezervacije { get; set; }
        public DbSet<Jelovnik> Jelovnik { get; set; }
        public DbSet<Narudzba> Narudzbe { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Narudzba>()
                .HasOne<Rezervacija>()
                .WithMany()
                .HasForeignKey(n => n.Rezervacija);
                

        }
    }
}

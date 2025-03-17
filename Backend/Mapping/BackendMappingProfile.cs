using AutoMapper;
using Backend.Models;
using Backend.Models.DTO;


namespace Backend.Mapping
{
    /// <summary>
    /// Klasa za definiranje mapiranja između modela i DTO objekata.
    /// </summary>
    public class BackendMappingProfile:Profile
    {
        /// <summary>
        /// Konstruktor u kojem se definiraju mapiranja.
        /// </summary>
        public BackendMappingProfile()
        {
            // Mapiranje gostiju
            CreateMap<Gost, GostDTORead>();
            CreateMap<GostDTOInsertUpdate, Gost>();
            CreateMap<Gost, GostDTOInsertUpdate>();

            CreateMap<Stol, StolDTORead>();
            CreateMap<StolDTOInsertUpdate, Stol>();
            CreateMap<Stol, StolDTOInsertUpdate>();

            
            // Mapiranje rezervacija
            CreateMap<Rezervacija, RezervacijaDTORead>()
                .ForCtorParam("GostImePrezime", opt => opt.MapFrom(src => src.Gost.Ime + " " + src.Gost.Prezime))
                .ForCtorParam("StolBroj", opt => opt.MapFrom(src => src.Stol.BrojStola));

            CreateMap<RezervacijaDTOInsertUpdate, Rezervacija>()
                .ForMember(dest => dest.Gost, opt => opt.Ignore()) 
                .ForMember(dest => dest.Stol, opt => opt.Ignore()) 
                .ForMember(dest => dest.DatumVrijeme, opt => opt.MapFrom(src => src.DatumVrijeme))
                .ForMember(dest => dest.BrojOsoba, opt => opt.MapFrom(src => src.BrojOsoba))
                .ForMember(dest => dest.Napomena, opt => opt.MapFrom(src => src.Napomena));
            CreateMap<Rezervacija, RezervacijaDTOInsertUpdate>();


            // Mapiranje jelovnika
            CreateMap<Jelovnik, JelovnikDTORead>();
            CreateMap<JelovnikDTOInsertUpdate, Jelovnik>()
                .ForMember(dest => dest.NazivJela, opt => opt.MapFrom(src => src.NazivJela))
                .ForMember(dest => dest.Kategorija, opt => opt.MapFrom(src => src.Kategorija))
                .ForMember(dest => dest.Cijena, opt => opt.MapFrom(src => src.Cijena));
            CreateMap<Jelovnik, JelovnikDTOInsertUpdate>();

            // Konfiguracija za Cijena svojstvo
            CreateMap<decimal, decimal>().ConvertUsing(src => decimal.Round(src, 2));


            // Mapiranje narudzbi
            CreateMap<Narudzba, NarudzbaDTORead>().ForCtorParam(
                   "RezervacijaGost",
                   opt => opt.MapFrom(src => src.Rezervacija.Gost.Prezime)
               ).ForCtorParam(
                   "JelovnikNaziv",
                   opt => opt.MapFrom(src => src.Jelovnik.NazivJela)
               );
            CreateMap<NarudzbaDTOInsertUpdate, Narudzba>();
            CreateMap<Narudzba, NarudzbaDTOInsertUpdate>();
         
        


            /*/// <summary>
       /// Metoda za dobivanje putanje do slike jelovnika.
       /// </summary>
       /// <param name="e">Objekt jelovnika.</param>
       /// <returns>Putanja do slike ili null ako slika ne postoji.</returns>
       private static string? PutanjaDatoteke(Jelo e)
       {
           try
           {
               var ds = Path.DirectorySeparatorChar;
               string slika = Path.Combine(Directory.GetCurrentDirectory()
                   + ds + "wwwroot" + ds + "slike" + ds + "jela" + ds + e.Sifra + ".png");
               return File.Exists(slika) ? "/slike/jela/" + e.Sifra + ".png" : null;
           }
           catch
           {
               return null;
           }
       }*/
        }
    }
}

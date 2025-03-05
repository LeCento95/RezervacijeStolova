using AutoMapper;
using Backend.Models;
using Backend.Models.DTO;


namespace Backend.Mapping
{
    public class BackendMappingProfile:Profile
    {
        public BackendMappingProfile()
        {
            // kreiramo mapiranja: izvor, odredište

            // Mapiranja gosta
            CreateMap<Gost, GostDTORead>();
            CreateMap<GostDTOInsertUpdate, Gost>();
            CreateMap<Gost, GostDTOInsertUpdate>();


            // Mapiranja narudzbe
   

            CreateMap<Narudzba, NarudzbaDTORead>().ForCtorParam(
                   "RezervacijaGost",
                   opt => opt.MapFrom(src => src.Rezervacija.Gost.Prezime)
               ).ForCtorParam(
                   "JelovnikNaziv",
                   opt => opt.MapFrom(src => src.Jelovnik.NazivJela)
               );

         



        }
    }
}

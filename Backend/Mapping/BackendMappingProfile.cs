using AutoMapper;
using Backend.Models;
using Backend.Models.DTO;


namespace Backend.Mapping
{
    public class BackendMappingProfile:Profile
    {
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
                .ForMember(dest => dest.Sifra, opt => opt.MapFrom(src => src.Sifra))
                .ForMember(dest => dest.Gost, opt => opt.MapFrom(src => src.Gost.Sifra))
                .ForMember(dest => dest.Stol, opt => opt.MapFrom(src => src.Stol.Sifra))
                .ForMember(dest => dest.DatumVrijeme, opt => opt.MapFrom(src => src.DatumVrijeme))
                .ForMember(dest => dest.BrojOsoba, opt => opt.MapFrom(src => src.BrojOsoba))
                .ForMember(dest => dest.Napomena, opt => opt.MapFrom(src => src.Napomena));
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








        }
    }
}

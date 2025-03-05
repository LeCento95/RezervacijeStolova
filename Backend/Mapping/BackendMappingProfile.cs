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

            // Mapiranja jelovnika
            CreateMap<Jelovnik, JelovnikDTORead>();
            CreateMap<JelovnikDTOInsertUpdate, Jelovnik>();
            CreateMap<Jelovnik, JelovnikDTOInsertUpdate>();

            // Mapiranja narudzbe
            CreateMap<NarudzbaDTOInsertUpdate, Narudzba>()
                .ForMember(dest => dest.Rezervacija, opt => opt.MapFrom(src => src.Rezervacija))
                .ForMember(dest => dest.Jelo, opt => opt.MapFrom(src => src.Jelo))
                .ForMember(dest => dest.Kolicina, opt => opt.MapFrom(src => src.Kolicina));
            CreateMap<Narudzba, NarudzbaDTORead>();

            // Mapiranja rezervacije
            CreateMap<RezervacijaDTOInsertUpdate, Rezervacija>()
                .ForMember(dest => dest.Gost, opt => opt.MapFrom(src => src.Gost))
                .ForMember(dest => dest.Stol, opt => opt.MapFrom(src => src.Stol))
                .ForMember(dest => dest.DatumVrijeme, opt => opt.MapFrom(src => src.DatumVrijeme))
                .ForMember(dest => dest.BrojOsoba, opt => opt.MapFrom(src => src.BrojOsoba))
                .ForMember(dest => dest.Napomena, opt => opt.MapFrom(src => src.Napomena));
            CreateMap<Rezervacija, RezervacijaDTORead>()
                .ForMember(dest => dest.Narudzbe, opt => opt.MapFrom(src => src.Narudzbe));

            // Mapiranja stolova
            CreateMap<StolDTOInsertUpdate, Stol>()
                .ForMember(dest => dest.BrojStola, opt => opt.MapFrom(src => src.BrojStola))
                .ForMember(dest => dest.Kapacitet, opt => opt.MapFrom(src => src.Kapacitet))
                .ForMember(dest => dest.Lokacija, opt => opt.MapFrom(src => src.Lokacija));
            CreateMap<Stol, StolDTORead>();



        }
    }
}

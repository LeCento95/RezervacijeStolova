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
            CreateMap<Gost, GostDTORead>();
            CreateMap<GostDTOInsertUpdate, Gost>();
            CreateMap<Gost, GostDTOInsertUpdate>();

            CreateMap<Stol, StolDTORead>();
            CreateMap<StolDTOInsertUpdate, Stol>();
            CreateMap<Stol, StolDTOInsertUpdate>();

            CreateMap<Rezervacija, RezervacijaDTORead>();
            CreateMap<RezervacijaDTOInsertUpdate, Rezervacija>();
            CreateMap<Rezervacija, RezervacijaDTOInsertUpdate>();

            CreateMap<Jelovnik, JelovnikDTORead>();
            CreateMap<JelovnikDTOInsertUpdate, Jelovnik>();
            CreateMap<Jelovnik, JelovnikDTOInsertUpdate>();

            CreateMap<Narudzba, NarudzbaDTORead>();
            CreateMap<NarudzbaDTOInsertUpdate, Narudzba>();
            CreateMap<Narudzba, NarudzbaDTOInsertUpdate>();
        }
    }
}

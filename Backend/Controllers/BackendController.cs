using AutoMapper;
using Backend.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    /// <summary>
    /// Apstraktna klasa BackendController koja služi kao osnovna klasa za sve kontrolere u aplikaciji.
    /// </summary>
    /// <param name="context">Instanca BackendContext klase koja se koristi za pristup bazi podataka.</param>
    /// <param name="mapper">Instanca IMapper sučelja koja se koristi za mapiranje objekata.</param>
    [Authorize]
    public abstract class BackendController(BackendContext context, IMapper mapper) : ControllerBase
    {
        /// <summary>
        /// Kontekst baze podataka.
        /// </summary>
        protected readonly BackendContext _context = context;

        /// <summary>
        /// Mapper za mapiranje objekata.
        /// </summary>
        protected readonly IMapper _mapper = mapper;
    }
}
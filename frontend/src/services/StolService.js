import { HttpService } from "./HttpService";

async function get() {
  return await HttpService.get('/Stol')
    .then((odgovor) => {
      console.table(odgovor.data);
      return { greska: false, poruka: odgovor.data };
    })
    .catch((e) => {
      console.error(e);
      return { greska: true, poruka: 'Greška pri dohvatu stolova' }; // Vraća objekt umjesto niza
    });
}

async function getBySifra(sifra){
  return await HttpService.get('/Stol/' + sifra)
  .then((odgovor)=>{
      return {greska: false, poruka: odgovor.data}
  })
  .catch(()=>{
      return {greska: true, poruka: 'Ne postoji Stol!'}
  })
}

async function dodaj(Stol) {
  return await HttpService.post('/Stol',Stol)
  .then((odgovor)=>{
      return {greska: false, poruka: odgovor.data}
  })
  .catch((e)=>{
      switch (e.status) {
          case 400:
              let poruke='';
              for(const kljuc in e.response.data.errors){
                  poruke += kljuc + ': ' + e.response.data.errors[kljuc][0] + ', ';
              }
              return {greska: true, poruka: poruke}
          default:
              return {greska: true, poruka: 'Stol se ne može dodati!'}
      }
  })
}

async function promjena(sifra,Stol) {
  return await HttpService.put('/Stol/' + sifra,Stol)
  .then((odgovor)=>{
      return {greska: false, poruka: odgovor.data}
  })
  .catch((e)=>{
      switch (e.status) {
          case 400:
              let poruke='';
              for(const kljuc in e.response.data.errors){
                  poruke += kljuc + ': ' + e.response.data.errors[kljuc][0] + ', ';
              }
              return {greska: true, poruka: poruke}
          default:
              return {greska: true, poruka: 'Stol se ne može promjeniti!'}
      }
  })
}

async function obrisi(sifra) {
  return HttpService.delete(`/Stol/${sifra}`)
    .then(() => {
      return { greska: false, poruka: "Obrisano" };
    })
    .catch(() => {
      return { greska: true, poruka: "Problem kod brisanja" };
    });
}

export default {
  get,
  getBySifra,
  dodaj,
  promjena,
  obrisi,
};
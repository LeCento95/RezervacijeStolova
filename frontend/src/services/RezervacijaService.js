import { HttpService } from "./HttpService";

async function get() {
  return await HttpService.get("/Rezervacija")
    .then((odgovor) => {
      return { greska: false, poruka: odgovor.data };
    })
    .catch((e) => {
      console.error("Greška prilikom dohvaćanja rezervacija:", e);
      return { greska: true, poruka: "Greška prilikom dohvaćanja rezervacija." };
    });
}

async function getBySifra(sifra) {
  return await HttpService.get(`/Rezervacija/${sifra}`)
    .then((odgovor) => {
      return { greska: false, poruka: odgovor.data };
    })
    .catch((e) => {
      console.error(
        `Greška prilikom dohvaćanja rezervacije sa šifrom ${sifra}:`,
        e
      );
      if (e.response) {
        return {
          greska: true,
          poruka: `Greška prilikom dohvaćanja rezervacije sa šifrom ${sifra}. Status: ${e.response.status}`,
          detalji: e.response.data,
        };
      } else {
        return {
          greska: true,
          poruka: `Greška prilikom dohvaćanja rezervacije sa šifrom ${sifra}. Nema odgovora od servera.`,
        };
      }
    });
}

async function dodaj(Rezervacija) {
  return await HttpService.post('/Rezervacija',Rezervacija)
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
              return {greska: true, poruka: 'Rezervacija se ne može dodati!'}
      }
  })
}

async function promjena(sifra,Rezervacija) {
  return await HttpService.put('/Rezervacija/' + sifra,Rezervacija)
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
              return {greska: true, poruka: 'Rezervacija se ne može promjeniti!'}
      }
  })
}

async function obrisi(sifra) {
  return HttpService.delete(`/Rezervacija/${sifra}`)
    .then(() => {
      return { greska: false, poruka: "Obrisano" };
    })
    .catch((e) => {
      console.error("Greška prilikom brisanja rezervacije:", e);
      return { greska: true, poruka: "Problem kod brisanja rezervacije." };
    });
}

export default {
  get,
  getBySifra,
  dodaj,
  promjena,
  obrisi,
};
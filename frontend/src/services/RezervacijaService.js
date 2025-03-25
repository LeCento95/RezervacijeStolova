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

async function dodaj(rezervacija) {
  return HttpService.post("/Rezervacija", rezervacija)
    .then(() => {
      return { greska: false, poruka: "Dodano" };
    })
    .catch((e) => {
      console.error("Greška prilikom dodavanja rezervacije:", e);
      return { greska: true, poruka: "Problem kod dodavanja rezervacije." };
    });
}

async function promjena(sifra, rezervacija) {
  return HttpService.put(`/Rezervacija/${sifra}`, rezervacija)
    .then(() => {
      return { greska: false, poruka: "Promijenjeno" };
    })
    .catch((e) => {
      console.error("Greška prilikom promjene rezervacije:", e);
      return { greska: true, poruka: "Problem kod promjene rezervacije." };
    });
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
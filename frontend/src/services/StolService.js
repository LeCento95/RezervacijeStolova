import { HttpService } from "./HttpService";

async function get() {
  return await HttpService.get("/Stol")
    .then((odgovor) => {
      return odgovor.data;
    })
    .catch((e) => {
      console.error("Greška prilikom dohvaćanja stolova:", e);
      return null;
    });
}

async function getBySifra(sifra) {
  return await HttpService.get(`/Stol/${sifra}`)
    .then((odgovor) => {
      return { greska: false, poruka: odgovor.data };
    })
    .catch((e) => {
      console.error(
        `Greška prilikom dohvaćanja stolova sa šifrom ${sifra}:`,
        e
      );
      if (e.response) {
        return {
          greska: true,
          poruka: `Greška prilikom dohvaćanja stolova sa šifrom ${sifra}. Status: ${e.response.status}`,
          detalji: e.response.data,
        };
      } else {
        return {
          greska: true,
          poruka: `Greška prilikom dohvaćanja stolova sa šifrom ${sifra}. Nema odgovora od servera.`,
        };
      }
    });
}

async function dodaj(stol) {
  return HttpService.post("/Stol", stol)
    .then(() => {
      return { greska: false, poruka: "Dodano" };
    })
    .catch(() => {
      return { greska: true, poruka: "Problem kod dodavanja" };
    });
}

async function promjena(sifra, stol) {
  return HttpService.put(`/Stol/${sifra}`, stol)
    .then(() => {
      return { greska: false, poruka: "Promijenjeno" };
    })
    .catch(() => {
      return { greska: true, poruka: "Problem kod promjene" };
    });
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
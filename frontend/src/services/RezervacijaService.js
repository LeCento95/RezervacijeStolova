import { HttpService } from "./HttpService";

async function get() {
  return await HttpService.get("/Rezervacija")
    .then((odgovor) => {
      return odgovor.data;
    })
    .catch((e) => {
      console.error("Greška prilikom dohvaćanja rezervacija:", e);
      return null;
    });
}

async function getBySifra(sifra) {
  return await HttpService.get(`/Rezervacija/${sifra}`)
    .then((odgovor) => {
      return { greska: false, poruka: odgovor.data };
    })
    .catch((e) => {
      console.error(`Greška prilikom dohvaćanja rezervacije sa šifrom ${sifra}:`, e);
      return {
        greska: true,
        poruka: `Greška prilikom dohvaćanja rezervacije sa šifrom ${sifra}`,
      };
    });
}

async function dodaj(rezervacija) {
  return HttpService.post("/Rezervacija", rezervacija)
    .then(() => {
      return { greska: false, poruka: "Dodano" };
    })
    .catch(() => {
      return { greska: true, poruka: "Problem kod dodavanja" };
    });
}

async function promjena(sifra, rezervacija) {
  return HttpService.put(`/Rezervacija/${sifra}`, rezervacija)
    .then(() => {
      return { greska: false, poruka: "Promijenjeno" };
    })
    .catch(() => {
      return { greska: true, poruka: "Problem kod promjene" };
    });
}

async function obrisi(sifra) {
  return HttpService.delete(`/Rezervacija/${sifra}`)
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
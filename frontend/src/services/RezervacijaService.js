import { HttpService } from "./HttpService";

const API_BASE = "https://carics95-001-site1.ptempurl.com/api/v1";

async function get() {
  try {
    const odgovor = await HttpService.get(`${API_BASE}/Rezervacija`);
    return { greska: false, poruka: odgovor.data };
  } catch (e) {
    console.error("Greška prilikom dohvaćanja rezervacija:", e);
    return { 
      greska: true, 
      poruka: "Greška prilikom dohvaćanja rezervacija.",
      status: e.response?.status,
      detalji: e.response?.data
    };
  }
}

async function getBySifra(sifra) {
  try {
    const odgovor = await HttpService.get(`${API_BASE}/Rezervacija/${sifra}`);
    return { greska: false, poruka: odgovor.data };
  } catch (e) {
    console.error(`Greška prilikom dohvaćanja rezervacije ${sifra}:`, e);
    return {
      greska: true,
      poruka: e.response?.data?.title || `Greška prilikom dohvaćanja rezervacije ${sifra}`,
      status: e.response?.status,
      detalji: e.response?.data
    };
  }
}

async function dodaj(rezervacija) {
  try {
    // Ensure proper data formatting
    const payload = {
      gostSifra: Number(rezervacija.gostSifra),
      stolSifra: Number(rezervacija.stolSifra),
      brojOsoba: Number(rezervacija.brojOsoba),
      datumVrijeme: new Date(rezervacija.datumVrijeme).toISOString(),
      napomena: rezervacija.napomena || ''
    };

    console.log('Sending payload:', payload);

    const response = await HttpService.post('/Rezervacija', payload);
    
    return {
      greska: false,
      poruka: response.data,
      status: response.status
    };
  } catch (error) {
    console.error('API Error:', error);
    
    if (error.response) {
      const errors = error.response.data?.errors || {};
      const errorMessages = Object.entries(errors)
        .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
        .join('; ');

      return {
        greska: true,
        poruka: errorMessages || error.response.data?.title || 'Neispravni podaci',
        status: error.response.status,
        validationErrors: errors
      };
    }

    return {
      greska: true,
      poruka: error.message || 'Došlo je do greške pri spremanju',
      status: null
    };
  }
}

async function promjena(sifra, rezervacija) {
  try {
    const odgovor = await HttpService.put(`${API_BASE}/Rezervacija/${sifra}`, rezervacija);
    return { greska: false, poruka: odgovor.data };
  } catch (e) {
    if (e.response?.status === 400) {
      const errors = e.response.data?.errors || {};
      const poruke = Object.entries(errors)
        .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
        .join('; ');
      
      return {
        greska: true,
        poruka: poruke || e.response.data?.title || 'Neispravni podaci',
        status: 400,
        validationErrors: errors
      };
    }
    
    return {
      greska: true,
      poruka: e.response?.data?.title || 'Rezervacija se ne može promjeniti!',
      status: e.response?.status,
      detalji: e.response?.data
    };
  }
}

async function obrisi(sifra) {
  try {
    await HttpService.delete(`${API_BASE}/Rezervacija/${sifra}`);
    return { greska: false, poruka: "Obrisano" };
  } catch (e) {
    console.error("Greška prilikom brisanja rezervacije:", e);
    return {
      greska: true,
      poruka: e.response?.data?.title || 'Problem kod brisanja rezervacije',
      status: e.response?.status,
      detalji: e.response?.data
    };
  }
}

export default {
  get,
  getBySifra,
  dodaj,
  promjena,
  obrisi,
};
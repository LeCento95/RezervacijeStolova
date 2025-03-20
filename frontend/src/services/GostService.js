import { HttpService } from "./HttpService";


async function get(){
    return await HttpService.get('/Gost')
        .then((odgovor) => {
            return odgovor.data;
        })
        .catch((e) => {
            console.error('Greška prilikom dohvaćanja gosta:', e);
            return null;
        });
}

async function getBySifra(sifra) {
    return await HttpService.get(`/Gost/${sifra}`)
      .then((odgovor) => {
        return { greska: false, poruka: odgovor.data };
      })
      .catch((e) => {
        console.error(
          `Greška prilikom dohvaćanja goste sa šifrom ${sifra}:`,
          e
        );
        if (e.response) {
          return {
            greska: true,
            poruka: `Greška prilikom dohvaćanja goste sa šifrom ${sifra}. Status: ${e.response.status}`,
            detalji: e.response.data,
          };
        } else {
          return {
            greska: true,
            poruka: `Greška prilikom dohvaćanja goste sa šifrom ${sifra}. Nema odgovora od servera.`,
          };
        }
      });
}


async function dodaj(gost){
    return HttpService.post('/Gost',gost)
    .then(()=>{return {greska: false, poruka: 'Dodano'}})
    .catch(()=>{return {greska: true, poruka:'Problem kod dodavanja'}})
}

async function promjena(sifra,gost){
    return HttpService.put('/Gost/'+sifra,gost)
    .then(()=>{return {greska: false, poruka: 'Promjenjeno'}})
    .catch(()=>{return {greska: true, poruka:'Problem kod promjene'}})
}

async function obrisi(sifra){
    return HttpService.delete('/Gost/'+sifra)
    .then(()=>{return {greska: false, poruka: 'Obrisano'}})
    .catch(()=>{return {greska: true, poruka:'Problem kod brisanja'}})
}

async function traziGosta(uvjet){
    return await HttpService.get('/Gost/trazi/'+uvjet)
    .then((odgovor)=>{
        //console.table(odgovor.data);
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{return {greska: true, poruka: 'Problem kod traženja gosta.'}})
}

async function traziStranicenje(page, pageSize) {
    return await HttpService.get(`/Gost/traziStranicenje?page=${page}&pageSize=${pageSize}`)
      .then((odgovor) => {
        return { greska: false, poruka: odgovor.data };
      })
      .catch((e) => {
        console.error('Problem kod traženja stranice gostiju:', e);
        return { greska: true, poruka: 'Problem kod traženja stranice gostiju.' };
      });
}



export default{
    get,
    getBySifra,
    dodaj,
    promjena,
    obrisi,
    traziGosta,
    traziStranicenje
};
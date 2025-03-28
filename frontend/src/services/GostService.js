import { HttpService } from "./HttpService";


async function get() {
    return await HttpService.get('/Gost')
      .then((odgovor) => {
        console.table(odgovor.data);
        return { greska: false, poruka: odgovor.data };
      })
      .catch((e) => {
        console.error(e);
        return { greska: true, poruka: 'Greška pri dohvatu gostiju' }; // Vraća objekt umjesto niza
      });
  }

async function getBySifra(sifra){
  return await HttpService.get('/Gost/' + sifra)
  .then((odgovor)=>{
      return {greska: false, poruka: odgovor.data}
  })
  .catch(()=>{
      return {greska: true, poruka: 'Ne postoji Gost!'}
  })
}


async function dodaj(Gost) {
  return await HttpService.post('/Gost',Gost)
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
              return {greska: true, poruka: 'Gost se ne može dodati!'}
      }
  })
}

async function promjena(sifra,Gost) {
  return await HttpService.put('/Gost/' + sifra,Gost)
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
              return {greska: true, poruka: 'Gost se ne može promjeniti!'}
      }
  })
}

async function obrisi(sifra) {
  return await HttpService.delete('/Gost/' + sifra)
  .then((odgovor)=>{
      console.log(odgovor);
      return {greska: false, poruka: odgovor.data}
  })
  .catch(()=>{
      return {greska: true, poruka: 'Gost se ne može obrisati!'}
  })
}

async function traziGosta(uvjet){
    return await HttpService.get('/Gost/trazi/'+uvjet)
    .then((odgovor)=>{
        console.table(odgovor.data);
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{return {greska: true, poruka: 'Problem kod traženja gosta.'}})
}

async function traziStranicenje(stranica,uvjet){
    return await HttpService.get('/Gost/traziStranicenje/'+stranica + '?uvjet=' + uvjet)
    .then((odgovor)=>{return  {greska: false, poruka: odgovor.data};})
    .catch((e)=>{ return {greska: true, poruka: 'Problem kod traženja gosta '}});
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
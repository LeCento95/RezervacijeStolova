import { HttpService } from "./HttpService";


async function get(){
    return await HttpService.get('/Gost')
    .then((odgovor)=>{
        //console.table(odgovor.data)
        return odgovor.data;
    })
    .catch((e)=>{})
}

async function getBySifra(sifra){
    return await HttpService.get('/Gost/' + sifra)
    .then((odgovor)=>{
        return odgovor.data;
    })
    .catch((e)=>{})
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



export default{
    get,
    getBySifra,
    dodaj,
    promjena,
    obrisi
}
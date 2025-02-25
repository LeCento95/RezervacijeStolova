import { useEffect, useState } from "react"
import GostService from "../../services/GostService"
import { Button, Table } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import moment from "moment";
import { GrValidate } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";


export default function GostiPregled(){

    const[gosti, setGosti] = useState();
    const navigate = useNavigate();

    async function dohvatiGoste(){
        const odgovor = await GostService.get()
        setGosti(odgovor)
    }

    // hooks (kuka) se izvodi prilikom dolaska na stranicu Smjerovi
    useEffect(()=>{
        dohvatiGoste();
    },[])
   
    function obrisi(sifra){
        if(!confirm('Sigurno obrisati')){
            return;
        }
        brisanjeSmjera(sifra);
    }

    async function brisanjeGosta(sifra) {
        const odgovor = await GostService.obrisi(sifra);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        dohvatiGoste();
    }


    return(
        <>
        <Link
        to={RouteNames.GOST_NOVI}
        className="btn btn-success siroko"
        >Dodaj novog gosta</Link>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Ime</th>
                    <th>Prezime</th>
                    <th>BrojTelefona</th>
                    <th>Email</th>
                    <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {gosti && gosti.map((gost,index)=>(
                    <tr key={index}>
                        <td>
                            {gost.ime}
                        </td>
                        <td>
                            {gost.prezime}
                        </td>
                        <td>
                            {gost.brojTelefona}
                        </td>
                        <td>
                            {gost.email}
                        </td>
                       
                        <td style = {{display: "flex", gap: "10px"}}>
                            <Button
                            style ={{ backgroundColor: '#7d3d9b', color: "white"}}
                            onClick={()=>navigate(`/gosti/${gost.sifra}`)}
                            >Promjena
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            
                            <Button
                            style = {{ backgroundColor: '#9c989a', color: "white"}}
                            variant="danger"
                            onClick={()=>obrisi(gost.sifra)}
                            >
                                Obriši
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )


}
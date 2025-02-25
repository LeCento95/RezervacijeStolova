import {Button, Col, Row} from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import { RouteNames } from "../../constants";
import GostService from "../../services/GostService";
import { useEffect, useState } from "react";

export default function GostiBrisanje(){
    const navigate = useNavigate();
    const [gost,setGost]=useState({});
    const routeParams = useParams();

    async function dohvatiGoste(){
        const odgovor=await GostService.getBySifra(routeParams.sifra)
        setGost(odgovor)
    }

    useEffect(()=>{
        dohvatiGoste();
    },[])

    async function obrisi (){
        const odgovor= await GostService.obrisi(routeParams.sifra,gost);
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        navigate(RouteNames.GOST_PREGLED)

        
        
    }

    function odradiSubmit(e){ // e je event
        e.preventDefault(); //nemoj odraditi zahtjev na server na standardni način
        
        let podaci = new FormData(e.target);

        dodaj(
            {
                ime: podaci.get('ime'),
                prezime: podaci.get('prezime'),
                brojTelefona: podaci.get('brojTelefona'),
                email: podaci.get('email')
            }
        );
        
    }
    
    return(
    <>
    <h2 className="naslov">Brisanje gosta</h2>
    <Form onSubmit={odradiSubmit}>

        <Form.Group controlId="ime">
            <Form.Label>Ime</Form.Label>
            <Form.Control type="text" name="ime" required 
            defaultValue={gost.naziv}/>
        </Form.Group>

        <Form.Group controlId="Prezime">
            <Form.Label>Prezime</Form.Label>
            <Form.Control type="text" name="prezime" required
            defaultValue={gost.prezime}/>
        </Form.Group>

        <Form.Group controlId="brojTelefona">
            <Form.Label>Broj Telefona</Form.Label>
            <Form.Control type="number" name="brojTelefona"
            defaultValue={gost.brojTelefona}/>
        </Form.Group>


        <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Check type="text" name="email"
            defaultValue={gost.email}/>
        </Form.Group>

        <hr/>

        <Row>
            <Col xs={6} sm={6} md={3} lg={2} xl={6} xxl={6}>
                <Link
                to={RouteNames.GOST_PREGLED}
                className="btn btn-danger siroko"
                >Odustani</Link>
            </Col>
            <Col xs={6} sm={6} md={9} lg={10} xl={6} xxl={6}>
                <Button variant="success" type="submit" className="siroko">
                    Obriši gosta
                </Button>
            </Col>
        </Row>


    </Form>




   
    </>
    )
}
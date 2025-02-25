import {Button, Col, Form, Row} from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import { RouteNames } from "../../constants";
import moment from "moment";
import GostService from "../../services/GostService";
import { useEffect, useState } from "react";


export default function GostiPromjena(){

    const navigate = useNavigate();
    const [gost,setGost] = useState({});
    const routeParams = useParams();

    useEffect(()=>{
        dohvatiGost();
    },[])

    async function promjena(gost){
        const odgovor = await GostService.promjena(routeParams.sifra,smjer);
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        navigate(RouteNames.GOST_PREGLED)
    }

    function odradiSubmit(e){ // e je event
        e.preventDefault(); // nemoj odraditi zahtjev na server pa standardnom načinu

        let podaci = new FormData(e.target);

        promjena(
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
    Promjena gosta
    <Form onSubmit={odradiSubmit}>

        <Form.Group controlId="ime">
            <Form.Label>Ime</Form.Label>
            <Form.Control type="text" name="ime" required 
            defaultValue={gost.naziv}/>
        </Form.Group>

        <Form.Group controlId="prezime">
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
            <Form.Control type="text" name="email" 
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
                    Promjeni smjer
                </Button>
            </Col>
        </Row>


    </Form>




   
    </>
    )
}
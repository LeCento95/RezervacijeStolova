import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PRODUKCIJA, RouteNames } from "../../constants";
import Service from "../../services/JelovnikService";
import { useEffect, useState, useRef } from "react";

import useLoading from "../../hooks/useLoading";
import useError from '../../hooks/useError';

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';


export default function JelovniciPromjena() {

    const navigate = useNavigate();
    const {showLoading, hideLoading} = useLoading();
    const routeParams = useParams();
    const [jelovnik, setJelovnici] = useState({});
    const { prikaziError } = useError();

    const [trenutnaSlika, setTrenutnaSlika] = useState("");
    const [slikaZaCrop, setSlikaZaCrop] = useState("");
    const [slikaZaServer, setSlikaZaServer] = useState("");
    const cropperRef = useRef(null);

    async function dohvatiJelovnik(){
        showLoading();
        const odgovor = await Service.getBySifra(routeParams.sifra);
        hideLoading();
        if(odgovor.greska){
            prikaziError(odgovor.poruka);
            return;
        }
        setJelovnici(odgovor.poruka); 

        if(odgovor.poruka.slika!=null){
            setTrenutnaSlika(PRODUKCIJA + odgovor.poruka.slika + `?${Date.now()}`); 
          }else{
            setTrenutnaSlika(nepoznato);
          }
    }

    useEffect(()=>{
        dohvatiJelovnik();
    },[]);

    async function promjena(e){
        showLoading();
        const odgovor = await Service.promjena(routeParams.sifra,e);
        hideLoading();
        if(odgovor.greska){
            prikaziError(odgovor.poruka);
            return;
        }
        navigate(RouteNames.JELOVNIK_PREGLED);
    }

    function obradiSubmit(e){ // e predstavlja event
        e.preventDefault();

        const podaci = new FormData(e.target);

        promjena({
            nazivJela: podaci.get("nazivJela"),
            kategorija: podaci.get("kategorija"),
            cijena: parseFloat(podaci.get("cijena")),
        });

    }

    function onCrop() {
        setSlikaZaServer(cropperRef.current.cropper.getCroppedCanvas().toDataURL());
      }
      function onChangeImage(e) {
        e.preventDefault();
    
        let files;
        if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
          files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
          setSlikaZaCrop(reader.result);
        };
        try {
          reader.readAsDataURL(files[0]);
        } catch (error) {
          console.error(error);
        }
      }
    
      async function spremiSliku() {
        showLoading();
        const base64 = slikaZaServer;
        const odgovor = await Service.postaviSliku(routeParams.sifra, {Base64: base64.replace('data:image/png;base64,', '')});
        hideLoading();
        if(odgovor.greska){
          prikaziError(odgovor.podaci);
        }
        setTrenutnaSlika(slikaZaServer);
      }    

    return(
        <>
            Promjena jela u jelovniku
            <Row>
        <Col key='1' sm={12} lg={6} md={6}>
            <Form onSubmit={obradiSubmit}>
            <Form.Group controlId="nazivJela">
                    <Form.Label>Naziv jela</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="nazivJela" required defaultValue={jelovnik.nazivJela}
                    />
                </Form.Group>

                <Form.Group controlId="kategorija">
                    <Form.Label>Kategorija</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="kategorija" required  defaultValue={jelovnik.kategorija}
                    />
                </Form.Group>

                <Form.Group controlId="cijena">
                    <Form.Label>Cijena</Form.Label>
                    <Form.Control type="number" 
                    step={0.01}
                    name="cijena" defaultValue={jelovnik.cijena}
                    />
                </Form.Group>


                <Row className='mb-4'>
              <Col key='1' sm={12} lg={6} md={12}>
                <j className='form-label'>Trenutna slika</j>
                <Image
                  //za lokalni development
                  //src={'https://edunovawp1.eu/' + trenutnaSlika}
                  src={trenutnaSlika}
                  className='slika'
                />
              </Col>
              <Col key='2' sm={12} lg={6} md={12}>
                {slikaZaServer && (
                  <>
                    <j className='form-label'>Nova slika</j>
                    <Image
                      src={slikaZaServer || slikaZaCrop}
                      className='slika'
                    />
                  </>
                )}
              </Col>
            </Row>

                <hr />
                <Row>
                    <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                    <Link to={RouteNames.JELOVNIK_PREGLED}
                    className="btn btn-danger siroko">
                    Odustani
                    </Link>
                    </Col>
                    <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
                    <Button variant="primary" type="submit" className="siroko">
                        Promjeni jelo
                    </Button>
                    </Col>
                </Row>
            </Form> 
            </Col>
        <Col key='2' sm={12} lg={6} md={6}>
        <input className='mb-3' type='file' onChange={onChangeImage} />
              <Button disabled={!slikaZaServer} onClick={spremiSliku}>
                Spremi sliku
              </Button>

              <Cropper
                src={slikaZaCrop}
                style={{ height: 400, width: '100%' }}
                initialAspectRatio={1}
                guides={true}
                viewMode={1}
                minCropBoxWidth={50}
                minCropBoxHeight={50}
                cropBoxResizable={false}
                background={false}
                responsive={true}
                checkOrientation={false}
                cropstart={onCrop}
                cropend={onCrop}
                ref={cropperRef}
              />
        </Col>
      </Row>
        </>
    )
}
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container } from 'react-bootstrap';
import NavBarRestorantReservation from './components/NavBarRestorantReservation';
import { Route, Routes } from 'react-router-dom';
import { RouteNames } from './constants';
import Pocetna from './pages/Pocetna';
import GostiPregled from './pages/gosti/GostiPregled';
import GostiDodaj from './pages/gosti/GostiDodaj';
import GostiPromjena from './pages/gosti/GostiPromjena';
import GostiBrisanje from './pages/gosti/GostiBrisanje';
import StoloviPregled from './pages/stolovi/StoloviPregled';
import StoloviDodaj from './pages/stolovi/StoloviDodaj';
import StoloviPromjena from './pages/stolovi/StoloviPromjena';
import StoloviBrisanje from './pages/stolovi/StoloviBrisanje';
import RezervacijePregled from './pages/rezervacije/RezervacijePregled';
import RezervacijeDodaj from './pages/rezervacije/RezervacijeDodaj';
import RezervacijePromjena from './pages/rezervacije/RezervacijePromjena';
import RezervacijeBrisanje from './pages/rezervacije/RezervacijeBrisanje';
import moment from 'moment';


function App() {
    function trenutnaGodina() {
        return moment().year();
    }

    return (
        <>
            <Container>
                <NavBarRestorantReservation />

                <Routes>
                  {/*Gosti*/}
                    <Route path={RouteNames.HOME} element={<Pocetna />} />
                    <Route path={RouteNames.GOST_PREGLED} element={<GostiPregled />} />
                    <Route path={RouteNames.GOST_NOVI} element={<GostiDodaj />} />
                    <Route path={RouteNames.GOST_PROMJENA} element={<GostiPromjena />} />
                    <Route path={RouteNames.GOST_BRISANJE} element={<GostiBrisanje />} />
                  
                  {/*Stolovi*/}
                    <Route path={RouteNames.HOME} element={<Pocetna />} />
                    <Route path={RouteNames.STOL_PREGLED} element={<StoloviPregled />} />
                    <Route path={RouteNames.STOL_NOVI} element={<StoloviDodaj />} />
                    <Route path={RouteNames.STOL_PROMJENA} element={<StoloviPromjena />} />
                    <Route path={RouteNames.STOL_BRISANJE} element={<StoloviBrisanje />} />
                  
                  {/*Rezervacije*/}
                    <Route path={RouteNames.HOME} element={<Pocetna />} />
                    <Route path={RouteNames.REZERVACIJA_PREGLED} element={<RezervacijePregled />} />
                    <Route path={RouteNames.REZERVACIJA_NOVA} element={<RezervacijeDodaj />} />
                    <Route path={RouteNames.REZERVACIJA_PROMJENA} element={<RezervacijePromjena />} />
                    <Route path={RouteNames.REZERVACIJA_BRISANJE} element={<RezervacijeBrisanje />} />



                   
                  

                </Routes>

                <hr />
                &copy; RestorantManagerReservation {trenutnaGodina()}
            </Container>
        </>
    );
}

export default App;
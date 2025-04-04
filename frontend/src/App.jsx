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
import JelovniciDodaj from './pages/jelovnici/JelovniciDodaj';
import JelovniciPregled from './pages/jelovnici/JelovniciPregled';
import JelovniciPromjena from './pages/jelovnici/JelovniciPromjena';






import LoadingSpinner from './components/LoadingSpinner'
import Login from "./pages/Login"
import useError from "./hooks/useError"
import ErrorModal from './components/ErrorModal'
import EraDijagram from './pages/EraDiagram'



function App() {
    
    const {errors, prikaziErrorModal, sakrijError} = useError();
    

    function godina(){
      const pocetna = 2024;
      const trenutna = new Date().getFullYear();
      if(pocetna === trenutna){
        return trenutna;
      }
      return pocetna + ' - ' + trenutna;
    }

    return (
      <>
        <LoadingSpinner />
        <ErrorModal show={prikaziErrorModal} errors={errors} onHide={sakrijError} />
        <Container className='aplikacija'>
          <NavBarRestorantReservation />
          <Routes>
          <Route path={RouteNames.HOME} element={<Pocetna />} />
          
        <>
            <Route path={RouteNames.HOME} element={<Pocetna />} />
            <Route path={RouteNames.GOST_PREGLED} element={<GostiPregled />} />
            <Route path={RouteNames.GOST_NOVI} element={<GostiDodaj />} />
            <Route path={RouteNames.GOST_PROMJENA} element={<GostiPromjena />} />
            <Route path={RouteNames.GOST_BRISANJE} element={<GostiBrisanje />} />
  
            <Route path={RouteNames.STOL_PREGLED} element={<StoloviPregled />} />
            <Route path={RouteNames.STOL_NOVI} element={<StoloviDodaj />} />
            <Route path={RouteNames.STOL_PROMJENA} element={<StoloviPromjena />} />
            <Route path={RouteNames.STOL_BRISANJE} element={<StoloviBrisanje />} />
  
            <Route path={RouteNames.REZERVACIJA_PREGLED} element={<RezervacijePregled />} />
            <Route path={RouteNames.REZERVACIJA_NOVA} element={<RezervacijeDodaj />} />
            <Route path={RouteNames.REZERVACIJA_PROMJENA} element={<RezervacijePromjena />} />

            <Route path={RouteNames.JELOVNIK_PREGLED} element={<JelovniciPregled />} />
            <Route path={RouteNames.JELOVNIK_NOVI} element={<JelovniciDodaj />} />
            <Route path={RouteNames.JELOVNIK_PROMJENA} element={<JelovniciPromjena />} />

            
            
  
            <Route path={RouteNames.ERA} element={<EraDijagram />} /> 
          </>
         : (
          <>
            <Route path={RouteNames.LOGIN} element={<Login />} />
          </>
        )
        </Routes>
      </Container>
      <Container>
        <hr />
        RestorantManagerReservation &copy; {godina()}
      </Container>
    </>
  )
}


export default App
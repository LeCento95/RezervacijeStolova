import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import moment from 'moment'
import NavBarRestorantReservation from './components/NavBarRestorantReservation'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constants'
import Pocetna from './pages/Pocetna'
import GostiPregled from './pages/gosti/GostiPregled'
import GostiDodaj from './pages/gosti/GostiDodaj'
import GostiPromjena from './pages/gosti/GostiPromjena'
import GostiBrisanje from './pages/gosti/GostiBrisanje'




function App() {

  function trenutnaGodina(){
    return moment().year();
  }

  return (
    <>
      <Container>
        <NavBarRestorantReservation />
        
        <Routes>
          <Route path={RouteNames.HOME} element={<Pocetna />} />
          <Route path={RouteNames.GOST_PREGLED} element={<GostiPregled />} />
          <Route path={RouteNames.GOST_NOVI} element={<GostiDodaj />} />
          <Route path={RouteNames.GOST_PROMJENA} element={<GostiPromjena />} />
          <Route path={RouteNames.GOST_BRISANJE} element={<GostiBrisanje />} />
        </Routes>

        <hr />
        &copy; RestorantManagerReservation {trenutnaGodina()}
      </Container>
     
    </>
  )
}

export default App
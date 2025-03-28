import './Pocetna.css'; // Import CSS fajla
import logo from '../assets/LOGO_RMR.png'; // Import slike

export default function Pocetna() {
    return (
        <div className="logo-container">
            <img src={logo} alt="Logo" className="full-page-logo" />
            <h1 className="welcome-title">
                
            </h1>
        </div>
    );
}
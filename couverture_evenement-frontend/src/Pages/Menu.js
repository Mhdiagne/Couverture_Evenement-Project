import React from 'react';
import event from "../assets/svg/welcome-animate.svg";
import '../assets/vendor/@fortawesome/fontawesome-free/css/all.min.css';
import Header from '../Components/Header';
import { Link } from 'react-router-dom';
import "../assets/css/menu.css"
import { accountService } from '../service/accountService';

const Menu = () => {
    const token = accountService.getToken();
    return (
        (token) ? (
        <div>
            <Header />
                <div className="menu">
                    <div className="menu-nav">
                        <Link to="/ajouter-demande">
                            <button className='nav-button'>
                                <i className="fas fa-plus fa-icon"></i>
                                <span className="icon-text1">Ajouter une demande</span>
                            </button>
                        </Link>
                    <br />
                    <Link to="/voir-mes-demandes">
                        <button className='nav-button'>
                            <i className="fas fa-eye fa-icon"></i>
                            <span className="icon-text2">Voir mes demandes</span>
                        </button>
                    </Link>
                    <br />
                    <Link to="/prestataires-disponibles">
                        <button className='nav-button'>
                            <i className="fas fa-user fa-icon"></i>
                            <span className="icon-text3">Prestataires disponibles</span>
                        </button>
                    </Link>
                    <br />
                    {/* <Link to="/suivre-ma-demande">
                        <button className='nav-button'>
                            <i className="fas fa-check-circle fa-icon"></i>
                            <span className="icon-text4">Suivre ma demande</span>
                        </button>
                    </Link> */}
                </div>
                <div className="menu-svg">
                    <img alt="event" src={event} width={"600px"} />
                </div>
            </div>
        </div>
    ) : ("")
    );
};

export default Menu;

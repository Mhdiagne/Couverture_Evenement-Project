import React, { Component } from 'react';
import logo from "../assets/img/logo.png";
import avatar from "../assets/img/MyAvatar.svg";
import "../assets/css/menu.css"
import { Link } from 'react-router-dom';
class Header extends Component {
    render() {
        return (
           
                
            <header className="header">
                <Link to ="/">
                    <img src={logo} alt="Logo" className="logo"  width={55} height={55}/>

                </Link>
                <h3 className="header-title">Gestion des Couvertures d'évènements</h3>
                <a href='/connexion'>
                <img src={avatar} alt="Avatar" className="avatar" width={45} height={45}/>
                </a>
            </header>
            
        );
    }
}

export default Header;
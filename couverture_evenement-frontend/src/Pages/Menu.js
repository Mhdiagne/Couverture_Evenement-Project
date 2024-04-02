import React from 'react';
import event from  "../assets/img/event.png";

const Menu = () => {
    return (
        <div className="menu">
            <div className="menu-nav">
                <button>Ajouter une Demande</button>
                <br/>
                <button>Voir me Demandes</button>
                <br/>
                <button>Prestataires Disponible</button>
                <br/>
                <button>Suivre ma Demande</button>
            </div>
            <div className="menu-svg">
                <img alt="event" src={event} width={"600px"}/>
            </div>
        </div>
    );
};

export default Menu;
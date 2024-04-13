import React from 'react';
import BlockCard2 from './BlockCard2';
import bilan from "../../assets/img/besTakk/bilan.png";
import solde from "../../assets/img/besTakk/money-bag.png";
import contact from "../../assets/img/besTakk/customer-service.png";
import like from "../../assets/img/besTakk/like.png";
import performance from "../../assets/img/besTakk/performance.png"
import publicService from "../../assets/img/besTakk/public-service.png"


const MainContentDashbord = () => {
    return (
        
            <>
                    <div className="content-container">
                        <div id='topoulen-ma' >
                            <BlockCard2
                                imageSrc={bilan} 
                                title="Prestations"
                                description="5 réussis"
                            />
                            <br/>

                            <BlockCard2
                                imageSrc={solde}
                                title="Rapports"
                                description="10 rapports"
                            />
                            <br/>
                            
                            <BlockCard2
                                imageSrc={contact}
                                title="Contact "
                                description="24h/24 - 7j/7"
                            />
                        </div>
                        <div id='topoulen-ma' >
                            <BlockCard2
                                imageSrc={performance}
                                title="Performance"
                                description="30%"
                            />
                            <br/>

                            <BlockCard2
                                imageSrc={like}
                                title="Mentions J'aime"
                                description="★★★ / 5"
                            />
                            <br/>
                            
                            <BlockCard2
                                imageSrc={publicService}
                                title="Service "
                                description="Decoration"
                            />
                        </div>
                        
                    </div>
               
            </>
            
       
    );
}

export default MainContentDashbord;

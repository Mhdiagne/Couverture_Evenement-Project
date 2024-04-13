import React from 'react';

import PrimarySearchAppBar from './PrimarySearchAppBar';
import SidebarDashBord from './SidebarDashbord';
const Rapports = () => {


  return (
    <div>
        <PrimarySearchAppBar/>
            <div className="dashboard-container">
                <SidebarDashBord />
                  <div className="content-container">
                    <br/>
                      <h1 id="special1"> Générations de rapports </h1>
                    <br/>                                        
                  </div>
            </div>
    </div>
  );
};

export default Rapports;

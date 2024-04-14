import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import "../../assets/css/styleDashbord.css"
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import HomeIcon from '@mui/icons-material/Home';

const SidebarDashBord = () => {
    return (
        <aside>
            <nav >
                <ul >
                    
                    <li>
                        <Link to = '/admin/home'> <HomeIcon className="sidebar-icon" /> Home DashBord</Link>
                    </li>
                    <li>
                        <Link to = '/admin/evenement'> <AssignmentTurnedInIcon className="sidebar-icon" /> Evénèments </Link>
                    </li>
                    <li>
                        <Link to = '/admin/prestations'> <AssignmentTurnedInIcon className="sidebar-icon" /> Prestations</Link>
                    </li>
                    
                    <li>
                        <Link to = '/admin/services'> <AssignmentTurnedInIcon className="sidebar-icon" /> Services</Link>
                    </li>
                    <li>
                        <Link to = '/admin/rapports'> <AssignmentTurnedInIcon className="sidebar-icon" /> Rapports</Link>
                    </li>

                </ul>
            </nav>
            <Outlet/>
        </aside>
    );
}

export default SidebarDashBord;

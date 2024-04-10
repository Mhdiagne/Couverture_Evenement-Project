

import { Link } from 'react-router-dom';
import logo from '../assets/img/Logo_uasz-bg-transparent.png';
import '../assets/css/Login.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';



export default function Login() {
    return (
        <main className="">
            <div className="login-container">
                <div className="text-center">
                    <img src={logo} alt='MyAvatar' width={150} height={150} />
                    <h3 className="login-title">
                        Bienvenue ! <br/> 
                        <span id='subText'>Connectez-vous à votre compte</span>
                    </h3>
                    <p>Vous n'avez pas de compte? 
                        <Link to="/inscription" className="login-link"> S'inscrire →</Link>
                    </p>
                </div>
                <form className="mt-8 space-y-5">
                    <div>
                        <label className="login-label">Email</label>
                        <input type="email" required className="login-input" />
                    </div>
                    <div>
                        <label className="login-label">Password</label>
                        <input type="password" required className="login-input" />
                    </div>
                    <button className="login-button">Se Connecter →</button>
                    <div className="text-center">
                        <br/>
                        <Link to="#" className="login-link">Mot de Passe oublié?</Link>
                    </div>
                </form>
            </div>
        </main>
    )
}

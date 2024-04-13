

import { Link,Navigate } from 'react-router-dom';
import logo from '../assets/img/Logo_uasz-bg-transparent.png';
import '../assets/css/Login.css'; 
import { SERVER_URL } from '../constante';
import { useState } from 'react';
import axios from "axios";
import { accountService } from '../service/accountService';
import Menu from './Menu';

export default function Login() {

    const [err, setErr] = useState("");
    const [navig, setNavigate] = useState(false);
    const [credentials, setCredentials] = useState({
        mail: "",
        password: "",
    });
    
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setCredentials((prevState) => ({ ...prevState, [name]: value }));
    };


    const handleOnSubmit = async (evt) => {
        try {
          evt.preventDefault();
    
          axios.post(SERVER_URL+"login", credentials)
            .then(response => {
              accountService.saveToken(response.headers.authorization);
    
              if (accountService.isLogged(response.headers.authorization)) {
                const mail = credentials.mail;
                accountService.getUsername(mail);    
                sessionStorage.setItem("jwt", response.headers.authorization);
                setNavigate(true);
                console.log(navig);
              } else {
                //setIsLogin(false);
              }
            })
            .catch(error => {
              console.log(error);
              setErr("Username ou password incorrect");
            });
        } catch (error) {
          console.error("ERREUR SOUMMISSION DU FORMS", err);
        }
    };

    if(navig) {
        return (<Navigate to={"/menu"}/>);
    }

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
                        <Link to="#" className="login-link"> S'inscrire →</Link>
                    </p>
                </div>
                <form className="mt-8 space-y-5" onSubmit={handleOnSubmit}>
                    <div>
                        <label className="login-label">Email</label>
                        <input type="email" name='mail' required className="login-input" onChange={handleChange} />
                    </div>
                    <div>
                        <label className="login-label">Password</label>
                        <input type="password" name='password' required className="login-input" onChange={handleChange} />
                    </div>
                    <button className="login-button" >Se Connecter →</button>
                    <div className="text-center">
                        <br/>
                        <Link to="#" className="login-link">Mot de Passe oublié?</Link>
                    </div>
                </form>
            </div>
        </main>
    )
}

import Navbar from "./Components/Navbar";
import { useState } from "react";
import Hero from "./Components/Hero";
import Faculties from "./Components/Faculties";
import LoginPanel from "./Components/LoginPanel";
import { ToastContainer, toast } from 'react-toastify';

const LandingPage = ()=> {
    const [loginButton, setLoginButton] = useState("none");
    return (
        <>
            <ToastContainer/>
            <Navbar loginButton={loginButton} setLoginButton={setLoginButton} />
            {loginButton !=="none" ? <LoginPanel loginButton={loginButton} setLoginButton={setLoginButton} />
            :
            <>
                <Hero/>
                <Faculties/>
             </>
            }
            
            
            
            
        </>
    );
}

export default LandingPage;
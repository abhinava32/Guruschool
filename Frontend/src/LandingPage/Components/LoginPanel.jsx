import React, { useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';


function LoginPanel({ loginButton, setLoginButton}) {
  return (
  <>  
    {/* {loginButton === "signin" ? <Signin setLoginButton={setLoginButton}/> : <Signup setLoginButton={setLoginButton}/> } */}
    {(() => {
        console.log("changed state is ", loginButton);
        switch (loginButton) {
          case 'signin':
            return <Signin setLoginButton={setLoginButton}/>
          case 'signup':
            return <Signup setLoginButton={setLoginButton}/>
          case 'forgot-psd':
            return <ForgotPassword setLoginButton={setLoginButton}/>
        }
      })()}
  </>  
  )};

export default LoginPanel;

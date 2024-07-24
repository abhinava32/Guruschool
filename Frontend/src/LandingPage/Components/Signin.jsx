import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import UserContext from '../../Context/userContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // Replace with your backend URL
  withCredentials: true, // Include credentials (cookies) in requests
});

function Signin({ setLoginButton }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const UserInfo = useContext(UserContext);


  const notify = () => {
     if(UserInfo.loggedUser){
      console.log("Logged in successfully");
        toast("Logged in successfully");
     }
        
  }
  useEffect(() => {
    notify();
  }, [UserInfo.loggedUser])

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    
    // Email validation logic
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail);
    if (!isValidEmail) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const handleResponse = (res) => {
    console.log(res.data.message);
    if(res.data.code === 1){
      setResponseMessage("user does not exists!");
    } 
    else if(res.data.code === 2){
      setResponseMessage("SERVER ERROR: Please try after some time!");
    }
    else{
      // alert("logged in as "+res.data.name);
      UserInfo.setUser(res.data.name);
      
      // UserInfo.setUser(res.data.name);
      setLoginButton('none');
    }
  }
  

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Your login logic here
    console.log("Email:", email);
    console.log("Password:", password);
    let student = {
      email: email,
      password: password
    }
    // Close modal by updating the loginButton state

    try{
    
      await axiosInstance.post('http://localhost:8000/login',student, setTimeout(2000)).then(
        response => {
          handleResponse(response);
        }
      );  
    }
    catch(error){
      console.log("Problem in api request",error);
    }
  };

  return (
    <>
    <ToastContainer />
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md z-10">
      {responseMessage && <h3 className='text-red-500 text-center' >{responseMessage}</h3>}
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Email</label>
            <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required />
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required />
          </div>
          <button type="submit" className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">Login</button>
        </form>
        <hr class="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <button onClick={()=>{setLoginButton("signup")}} className="mt-4 text-sm text-gray-600 hover:text-gray-800 focus:outline-none">Don't have an account ?</button>
        <br />
        <button onClick={() => {setLoginButton("forgot-psd")}} className="mt-4 text-sm text-gray-600 hover:text-gray-800 focus:outline-none">Forgot Password ?</button>
        <br />
        <button onClick={() => setLoginButton("none")} className="mt-4 text-sm text-gray-600 hover:text-gray-800 focus:outline-none">Close</button>
      </div>
    </div>
    </>
  );
}

export default Signin;

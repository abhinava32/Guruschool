import React, { useState } from 'react';
import axios from 'axios';
import { NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PasswordStrength from './PasswordStrength';


function Signup({ setLoginButton, toast }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

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

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleResponse = (res) => {
    console.log(res.data.message);
    if(res.data.code === 1){
      setResponseMessage("user already exists!");
    } 
    else if(res.data.code === 2){
      setResponseMessage("SERVER ERROR: Please try after some time!");
    }
    else{
      setLoginButton('signin');
    }
  }
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newStudent = {
      name : name,
      email : email,
      password: password
    }
 
    try{
    
      await axios.post('http://localhost:8000/students/new-student',newStudent, setTimeout(2000)).then(
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
    <div className=" flex items-center justify-center ">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md my-40 z-10 overflow-y-auto">
        {responseMessage && <h3 className='text-red-500 text-center' >{responseMessage}</h3>}
        <h2 className="text-2xl font-semibold mb-4">Create Account</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Name</label>
                <input type="text" id="name" name="name" value={name} onChange={handleNameChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Email</label>
            <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required />
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required />
            <PasswordStrength password={password}/>
          </div>
          <button type="submit" className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">Sign Up</button>
        </form>
        <hr class="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <button onClick={()=>{setLoginButton("signin")}} className="mt-4 text-sm text-gray-600 hover:text-gray-800 focus:outline-none">Already have an account ?</button>
        <br />
        <button onClick={() => setLoginButton("none")} className="mt-4 text-sm text-gray-600 hover:text-gray-800 focus:outline-none">Close</button>
      </div>
      
    </div>
    </>
  );
}

export default Signup;

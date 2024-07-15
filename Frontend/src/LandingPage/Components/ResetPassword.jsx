import React, { useState } from 'react';
import { NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ResetPassword({ setLoginButton, toast }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [emailError, setEmailError] = useState('');

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
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your login logic here
    console.log("Email:", email);
    console.log("Password:", password);
    // Close modal by updating the loginButton state
    toast('Successfully Created Account');
    // NotificationManager.success('Success message', );
    setLoginButton("none");
  };

  return (
    <>
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md z-10">
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

export default ResetPassword;

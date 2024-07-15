import React, { useState } from 'react';

function ForgotPassword({ setLoginButton }) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [OTP, setOTP] = useState('');
  const [otpError, setOtpError] = useState('');
  const [sentOtp, setSentOtp] = useState(false);

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail);
    if (!isValidEmail) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };
  
  const handleEnterOTP = (e)=>{
    const inputOtp = e.target.value;
    
    setOTP(inputOtp);
    const isValidOTP = /^(\s*\d{6}\s*)(,\s*\d{6}\s*)*,?\s*$/.test(inputOtp);
    if (!isValidOTP) {
        setOtpError('Invalid OTP');
        setSentOtp(false);
      } else {
        setOtpError('');
        setSentOtp(true);
      }
  }
 

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your login logic here
    console.log("Email:", email);
    // Close modal by updating the loginButton state
    setLoginButton("none");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md z-10">
        <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Email</label>
            <input type="email" id="email" name="email" value={email} 
            onChange={handleEmailChange} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required />
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="otp" className="block text-gray-700 font-semibold mb-1">OTP</label>
            <input type="text" id="otp" name="otp" value={OTP} placeholder="Enter 6 digit OTP" 
            onChange={handleEnterOTP} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required />
            {otpError && <p className="text-red-500">{otpError}</p>}
          </div>
          
          <button type="submit" className="w-full bg-indigo-500 text-white my-2 py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">Send OTP</button>
          {!sentOtp ? <button type="submit" className="w-full bg-indigo-500 text-white my-2 py-2 px-4 rounded-md  cursor-not-allowed opacity-50">
                    Submit Button
                  </button> :
                    <button type="submit" className="w-full bg-indigo-500 text-white my-2 py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                    Submit Button
                  </button>
          
            }
          
        </form>
        <hr class="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <button onClick={()=>{setLoginButton("signup")}} className="mt-2 text-sm text-gray-600 hover:text-gray-800 focus:outline-none">Don't have an account ?</button>
        <br />
        <button onClick={() => setLoginButton("signin")} className="mt-2 text-sm text-gray-600 hover:text-gray-800 focus:outline-none">SignIn</button>
        <br />
        <button onClick={() => setLoginButton("none")} className="mt-2 text-sm text-gray-600 hover:text-gray-800 focus:outline-none">Close</button>
      </div>
    </div>
  );
}


export default ForgotPassword;
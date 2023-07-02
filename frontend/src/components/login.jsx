import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] =useState('');
  const [password, setPassword] =useState('');
  const [errorMessage, setErrorMessage] =useState('');

  const navigate = useNavigate();
  const handleLogin = async(e) =>{
    e.preventDefault();
    try{
      const response = await axios.post('https://flavor-fusion-ylnk.onrender.com/login', { email, password },{ withCredentials: true });
      if (response.status === 200)
      {
        const userId = response.data.userId;
        navigate('/dashboard', { state: { userId } });
      }
     
    } catch(error){

    if (error.response && error.response.status === 400) 
    {
        setErrorMessage('Invalid email or password. Please try again.');
    } 
      else 
    {
        setErrorMessage('An error occurred. Please try again.');
    }
    }
  };

return(
    <div className='login_signUp-container'>
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: '400px' }}>
        <div className="card-header text-center bg-primary text-white">
          <h4 className="card-title">Falvor Fusion</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Enter your email" required />
          </div>
          <div className="form-group mb-3">
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter your password" required />
          </div>
            {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
          <div className="form-group text-center">
          <button type="submit" className="btn btn-primary"> Login </button>
          </div>
          </form>
          <p className="text-center mt-3">
            Create a new account? <Link to="/">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
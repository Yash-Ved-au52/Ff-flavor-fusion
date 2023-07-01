import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Typography } from '@material-ui/core';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://flavor-fusion-ylnk.onrender.com/signUp', { name, email, password });

      if(response.status === 200) 
      {
        console.log('Sign up successful');
        navigate('/dashboard');
      }
    }catch(error) 
    {
      if (error.response && error.response.status === 400) 
    {
        setErrorMessage('User with this email already exists');
    } 
      else 
    {
        setErrorMessage('An error occurred. Please try again.');
    }
    }
  };

return(
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: '400px' }}>
        <div className="card-header text-center bg-primary text-white">
        <h4 className="card-title">Falvor Fusion</h4>
        </div>
        <div className="card-body">
    <form onSubmit={handleSignUp}>
      <div className="form-group mb-3">
        <input type="text" value={name} className="form-control" onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        </div>
        <div className="form-group mb-3">
        <input type="email" value={email} className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        </div>
        <div className="form-group mb-3">
        <input type="password" value={password} className="form-control" onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        </div>
        {errorMessage && <Typography variant="body1" color="error">{errorMessage}</Typography>}
      <div className="form-group text-center">
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </div>
    </form>
      <p className="text-center mt-3">
        Already have an account? <Link to="/login">Login</Link>
      </p>
      </div>
      </div>
    </div>
  );
};

export default SignUp;

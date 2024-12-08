import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    }
  };

  return (
    <div
      className="h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url('/75ez.gif')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="bg-white bg-opacity-90 p-6 rounded shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Sign in to your account</h1>
        <p className="mb-4">
          Don't have an account yet?{' '}
          <Link to="/signup" className="underline text-green-600 hover:text-purple-800">
            Sign up.
          </Link>
        </p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-left font-medium mb-1">Email Address</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              type="email"
              required
            />
          </div>
          <div>
            <label className="block text-left font-medium mb-1">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              type="password"
              required
            />
          </div>
          <button className="w-full p-2 bg-green-600 text-white rounded font-bold hover:bg-red-500 transition">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;




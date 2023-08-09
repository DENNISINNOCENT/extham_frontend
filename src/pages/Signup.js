import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { OmsContext } from '../components/auth/AuthContext';
import axios from 'axios';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [role, setRole] = useState('supplier');
  const [buyer_name, setBuyerName] = useState('');
  const [supplier_name, setSupplierName] = useState('');

  const { backendUrl } = useContext(OmsContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      if (password !== passwordConfirmation) {
        console.error('Password and confirmation do not match.');
        return;
      }

      const response = await axios.post(`${backendUrl}/signup/${role}`, {
        email,
        password,
        buyer_name,
        supplier_name,
      });
      
      // Handle successful sign-up
      alert('Sign-up Successful!')
      console.log('Sign-up successful:', response.data);

      // Clear form fields
      setEmail('');
      setPassword('');
      setPasswordConfirmation('');
      setBuyerName('');
      setSupplierName('');
      setRole('supplier');

      // Redirect to login
     navigate('/');
    } catch (error) {
      // Handle sign-up error, e.g., display an error message
      console.error('Sign-up error:', error.response.data);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-300 to-purple-300">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSignUp}>
        <div className="mb-3">
          <label htmlFor="role" className="block font-medium mb-1">
            Role:
          </label>
          <select
            id="role"
            className="w-full px-3 py-2 rounded-md border"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="supplier">Supplier</option>
            <option value="buyer">Buyer</option>
            <option value="broker">Broker</option>
            </select>
          </div>
        {role === 'supplier' && (
            <div className="mb-3">
              <input
                type="text"
                className="w-full px-3 py-2 rounded-md border"
                placeholder="Supplier Name"
                value={supplier_name}
                onChange={(e) => setSupplierName(e.target.value)}
              />
            </div>
          )}
          {role === 'buyer' && (
            <div className="mb-3">
              <input
                type="text"
                className="w-full px-3 py-2 rounded-md border"
                placeholder="Buyer Name"
                value={buyer_name}
                onChange={(e) => setBuyerName(e.target.value)}
              />
            </div>
          )}
          <div className="mb-3">
            <input
              type="email"
              className="w-full px-3 py-2 rounded-md border"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="w-full px-3 py-2 rounded-md border"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="w-full px-3 py-2 rounded-md border"
              placeholder="Confirm Password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="mt-3 text-center">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;

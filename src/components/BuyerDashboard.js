import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import BuyerForm from '../pages/BuyerForm';
import Navbar from './Navbar';
import BuyerFormRequests from '../pages/BuyerFormRequests';
import { OmsContext } from './auth/AuthContext';
import BuyerLayout from './BuyerLayout';
import axios from 'axios';

function BuyerDashboard({ updateLoggedIn }) {
  const [buyer_foams, setBuyer_Foams] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const {backendUrl} = useContext(OmsContext);

  useEffect(() => {
    fetchBuyerForms();
  }, []);

// Fetch Buyer forms
  useEffect(() => {
    const storedBuyerForms = localStorage.getItem('buyer_foams');
    if (storedBuyerForms) {
      setBuyer_Foams(JSON.parse(storedBuyerForms));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('buyer_foams', JSON.stringify(buyer_foams));
  }, [buyer_foams]);

  async function fetchBuyerForms() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${backendUrl}/buyer_foams`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data;
      setBuyer_Foams(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Perform update operation on forms
  async function updateBuyerForm(id, newData) {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${backendUrl}/buyer_foams/${id}`, newData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const updatedBuyerForms = buyer_foams.map((buyer_foam) => {
        if (buyer_foam.id === id) {
          return { ...buyer_foam, ...newData };
        }
        return buyer_foam;
      });
      setBuyer_Foams(updatedBuyerForms);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }
  
  async function deleteBuyerForms(id) {
    try {
      const token = localStorage.getItem('token'); // Replace with your token

      await axios.delete(`${backendUrl}/buyer_foams/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });
      setBuyer_Foams(buyer_foams.filter((buyer_foam) => buyer_foam.id !== id));
    } catch (error) {
      console.error('Error Deleting data:', error);
    }
  }

  function handleUpdateBuyerForm(newForm) {
    setBuyer_Foams([...buyer_foams, newForm])
  }

  // Fetch the stored route from localStorage on page load
  useEffect(() => {
    const storedRoute = localStorage.getItem('currentRoute');
    if (storedRoute) {
      navigate(storedRoute); // Navigate to the stored route
    }
  }, []);

  // Store the current route in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('currentRoute', location.pathname);
  }, [location.pathname]);

  return (
    <div>
      <Navbar updateLoggedIn={updateLoggedIn} />
      <BuyerLayout updateLoggedIn={updateLoggedIn}>
        <Routes>
          <Route path="/" element={<Navigate to="/buyerdashboard/buyer-forms" />} />
        
          <Route
            path="/buyer-forms"
            element={<BuyerForm  buyer_foams={buyer_foams} handleUpdateBuyerForm={handleUpdateBuyerForm} deleteBuyerForms={deleteBuyerForms} updateBuyerForm={updateBuyerForm} />}
          />
          
          <Route
            path="/buyer-requests"
            element={<BuyerFormRequests  buyer_foams={buyer_foams} deleteBuyerForms={deleteBuyerForms} updateBuyerForm={updateBuyerForm} />}
          />
        </Routes>
        
      </BuyerLayout>
    </div>
  );
}

export default BuyerDashboard;
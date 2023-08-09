import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import SellerForm from '../pages/SellerForm';
import Navbar from './Navbar';
import SellerFormRequests from '../pages/SellerFormRequests';
import { OmsContext } from './auth/AuthContext';
import SupplierLayout from './SupplierLayout';
import axios from 'axios';

function SellerDashboard({ updateLoggedIn, useType, suppliers }) {
  const [supplies, setSupplies] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const {backendUrl} = useContext(OmsContext);

  useEffect(() => {
    fetchSellerForms();
  }, []);

  //Fetch Supplier Forms
  useEffect(() => {
    const storedSupplies = localStorage.getItem('supplies');
    if (storedSupplies) {
      setSupplies(JSON.parse(storedSupplies));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('supplies', JSON.stringify(supplies));
  }, [supplies]);

  async function fetchSellerForms() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${backendUrl}/supplies`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data;
      setSupplies(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Perform update operation on forms
  async function updateSupplierForm(id, newData) {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${backendUrl}/supplies/${id}`, newData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const updatedSupplierForms = supplies.map((supply) => {
        if (supply.id === id) {
          return { ...supply, ...newData };
        }
        return supply;
      });
      setSupplies(updatedSupplierForms);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }
  
  async function deleteSupplierForms(id) {
    try {
      const token = localStorage.getItem('token'); // Replace with your token

      await axios.delete(`${backendUrl}/supplies/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });
      setSupplies(supplies.filter((supply) => supply.id !== id));
    } catch (error) {
      console.error('Error Deleting data:', error);
    }
  }

  function handleUpdateSupplierForm(newForm) {
    setSupplies([...supplies, newForm])
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
      <Navbar updateLoggedIn={updateLoggedIn} useType={useType} />
      <SupplierLayout updateLoggedIn={updateLoggedIn}>
        <Routes>
          <Route path="/" element={<Navigate to="/sellerdashboard/suppliers" />} />
           <Route
            path="/seller-forms"
            element={<SellerForm suppliers={suppliers} supplies={supplies} handleUpdateSupplierForm={handleUpdateSupplierForm} deleteSupplierForms={deleteSupplierForms} updateSupplierForm={updateSupplierForm} />}
          />
          <Route
            path="/seller-requests"
            element={<SellerFormRequests  supplies={supplies} deleteSupplierForms={deleteSupplierForms} updateSupplierForm={updateSupplierForm} />}
          />
        </Routes> 
      </SupplierLayout>
    </div>
  );
}

export default SellerDashboard;
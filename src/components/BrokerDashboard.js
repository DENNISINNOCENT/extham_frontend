import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import BuyerForm from '../pages/BuyerForm';
import SellerForm from '../pages/SellerForm';
import SubmittedBuyerForms from '../pages/SubmittedBuyerForms';
import SubmittedSupplierForms from '../pages/SubmittedSupplierForms';
import Navbar from './Navbar';
import Buyer from '../pages/Buyer';
import Seller from '../pages/Seller';
import { OmsContext } from './auth/AuthContext';
import BrokerLayout from './BrokerLayout';
import axios from 'axios';

function BrokerDashboard({ updateLoggedIn, suppliers, useType, userType, updateSupplier, handleUpdateSupplier, deleteSuppliers,  buyers, deleteBuyers, updateBuyer, handleUpdateBuyer }) {
  const [buyer_foams, setBuyer_Foams] = useState([]);
  const [supplies, setSupplies] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const {backendUrl} = useContext(OmsContext);

  useEffect(() => {
    fetchBuyerForms();
    fetchSellerForms();
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
      const response = await axios.get(`${backendUrl}/supplies`,{
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
      <Navbar updateLoggedIn={updateLoggedIn} useType={useType} userType={userType} />
      <BrokerLayout updateLoggedIn={updateLoggedIn}>
        <Routes>
          <Route path="/" element={<Navigate to="/brokerdashboard/buyers" />} />
          <Route
            path="/buyers"
            element={<Buyer buyers={buyers} handleUpdateBuyer={handleUpdateBuyer} deleteBuyers={deleteBuyers} updateBuyer={updateBuyer} />}
          />
          <Route
            path="/suppliers"
            element={<Seller suppliers={suppliers} handleUpdateSupplier={handleUpdateSupplier} deleteSuppliers={deleteSuppliers} updateSupplier={updateSupplier} />}
          />
          <Route
            path="/buyer_forms"
            element={<SubmittedBuyerForms buyer_foams={buyer_foams} deleteBuyerForms={deleteBuyerForms} updateBuyerForm={updateBuyerForm} />}
          />
          <Route
            path="/supplier_forms"
            element={<SubmittedSupplierForms supplies={supplies} deleteSupplierForms={deleteSupplierForms} updateSupplierForm={updateSupplierForm} />}
          />
          <Route
            path="/buyer-forms"
            element={<BuyerForm buyers={buyers} suppliers={suppliers} buyer_foams={buyer_foams} handleUpdateBuyerForm={handleUpdateBuyerForm} deleteBuyerForms={deleteBuyerForms} updateBuyerForm={updateBuyerForm} />}
          />
           <Route
            path="/seller-forms"
            element={<SellerForm buyers={buyers} suppliers={suppliers} supplies={supplies} handleUpdateSupplierForm={handleUpdateSupplierForm} deleteSupplierForms={deleteSupplierForms} updateSupplierForm={updateSupplierForm} />}
          />
          
        </Routes>
        
      </BrokerLayout>
    </div>
  );
}

export default BrokerDashboard;
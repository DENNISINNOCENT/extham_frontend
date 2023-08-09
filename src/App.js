import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BrokerDashboard from './components/BrokerDashboard';
import BuyerDashboard from './components/BuyerDashboard';
import SellerDashboard from './components/SellerDashboard';
import BuyerForm from './pages/BuyerForm';
import SellerForm from './pages/SellerForm';
import Buyer from './pages/Buyer';
import Seller from './pages/Seller';
import BuyerFormRequests from './pages/BuyerFormRequests';
import SellerFormRequests from './pages/SellerFormRequests';
import Login from './pages/Login';
import Signup from './pages/Signup'
import { OmsContext } from './components/auth/AuthContext'

function App() {
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const [isBroker, setIsBroker] = useState(false);
  const [isBuyer, setIsBuyer] = useState(false);
  const [isSupplier, setIsSupplier] = useState(false);
  const [buyers, setBuyers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [userType, setUserType] = useState('broker');
  const [useType, setUseType] = useState('supplier');
  const [usingType, setUsingType] = useState('buyer');
  const { backendUrl } = useContext(OmsContext);

  useEffect(() => {
    fetchBuyers();
    fetchSuppliers();
    checkLoggedIn();
  }, []);

  // Fetch Buyers
  useEffect(() => {
    const storedBuyers = localStorage.getItem('buyers');
    if (storedBuyers) {
      setBuyers(JSON.parse(storedBuyers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('buyers', JSON.stringify(buyers));
  }, [buyers]);

  async function fetchBuyers() {
    try {
      const token = localStorage.getItem('token'); // Retrieve the staff ID from local storage
      const buyerId = localStorage.getItem('buyerId');
      const response = await axios.get(`${backendUrl}/buyers?buyer_id=${buyerId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data;
      setBuyers(data);
    } catch (error) {
      console.log(error);
    }
  }

  const updateBuyer = (updatedBuyer) => {
    const updatedBuyers = buyers.map((buyer) =>
      buyer.id === updatedBuyer.id ? updatedBuyer : buyer
    );
    setBuyers(updatedBuyers);
  };
  

  async function deleteBuyers(id) {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${backendUrl}/buyers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBuyers(buyers.filter((buyer) => buyer.id !== id));
    } catch (error) {
      console.error('Error Deleting data:', error);
    }
  }

  function handleUpdateBuyer(newBuyer) {
    setBuyers([...buyers, newBuyer]);
  }



  // Fetch Suppliers
  useEffect(() => {
    const storedSuppliers = localStorage.getItem('suppliers');
    if (storedSuppliers) {
      setSuppliers(JSON.parse(storedSuppliers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('suppliers', JSON.stringify(suppliers));
  }, [suppliers]);

  async function fetchSuppliers() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${backendUrl}/suppliers`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data;
      setSuppliers(data);
    } catch (error) {
      console.log(error);
    }
  }
  const updateSupplier = (updatedSupplier) => {
    const updatedSuppliers = suppliers.map((supplier) =>
      supplier.id === updatedSupplier.id ? updatedSupplier : supplier
    );
    setSuppliers(updatedSuppliers);
  };

  async function deleteSuppliers(id) {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${backendUrl}/suppliers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSuppliers(suppliers.filter((supplier) => supplier.id !== id));
    } catch (error) {
      console.error('Error Deleting data:', error);
    }
  }

  function handleUpdateSupplier(newSupplier) {
    setSuppliers([...suppliers, newSupplier]);
  }

  useEffect(() => {
    // Check if the user is logged in
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setIsLoggedIn(true);
      setIsBroker(storedUser.isBroker);
      setIsSupplier(storedUser.isSupplier);
      setIsBuyer(storedUser.isBuyer);
      // setLoggedInStaff(storedUser.staff_name); // Set the loggedInStaff based on the staff_name of the logged-in user
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('isBroker', storedUser.isBroker ? 'true' : 'false');
      localStorage.setItem('isBuyer', storedUser.isBuyer ? 'true' : 'false');
      localStorage.setItem('isSupplier', storedUser.isSupplier ? 'true' : 'false');
      localStorage.setItem('token', storedUser.token);
    }
  }, []);

  function handleLogin(user) {
    localStorage.setItem('user', JSON.stringify(user));
    setIsLoggedIn(true);
    setIsBroker(user.isBroker);
    setIsBuyer(user.isBuyer);
    setIsSupplier(user.isSupplier);
    localStorage.setItem('isLoggedIn', 'true'); // Add this line to store the login state
    localStorage.setItem('isBroker', user.isBroker ? 'true' : 'false');
    localStorage.setItem('isSupplier', user.isSupplier ? 'true' : 'false');
    localStorage.setItem('isBuyer', user.isBuyer ? 'true' : 'false');
    localStorage.setItem('token', user.token);


  }
  
  function updateLoggedIn(flag) {
    setIsLoggedIn(flag);
  }

  function checkLoggedIn() {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const storedIsBroker = localStorage.getItem('IsBroker');
    const storedIsBuyer = localStorage.getItem('IsBuyer');
    const storedIsSupplier = localStorage.getItem('isSupplier');
  
    if (storedIsLoggedIn && storedIsBroker && storedIsSupplier && storedIsBuyer) {
      setIsLoggedIn(storedIsLoggedIn === 'true');
      setIsBroker(storedIsBroker === 'true');
      setIsBuyer(storedIsBuyer === 'true');
      setIsSupplier(storedIsSupplier === 'true');
    }
  }

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isloggedIn);
    localStorage.setItem('isBroker', isBroker);
    localStorage.setItem('isBuyer', isBuyer);
    localStorage.setItem('isSupplier', isSupplier);
  }, [isloggedIn, isBuyer, isSupplier, isBroker]);

  return (
    <Router>
      <Routes>
      
      <Route  path='/' element={<Login onLogin={handleLogin} /> } />
        <Route
          path="/brokerdashboard/*"
          element={
            isBroker ? (
              <BrokerDashboard
                updateLoggedIn={updateLoggedIn}
                isLoggedIn={isloggedIn}
                isBroker={isBroker}
                isBuyer={isBuyer}
                buyers={buyers}
                useType={useType}
                userType={userType}
                handleUpdateBuyer={handleUpdateBuyer}
                deleteBuyers={deleteBuyers}
                updateBuyer={updateBuyer}
                suppliers={suppliers}
                handleUpdateSupplier={handleUpdateSupplier}
                deleteSuppliers={deleteSuppliers}
                updateSupplier={updateSupplier}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/buyerdashboard/*"
          element={
            isBuyer ? (
              <BuyerDashboard
                updateLoggedIn={updateLoggedIn}
                isLoggedIn={isloggedIn}
                isBuyer={isBuyer}
                buyers={buyers}
                usingType={usingType}
                setBuyers={setBuyers}
                handleUpdateBuyer={handleUpdateBuyer}
                deleteBuyers={deleteBuyers}
                updateBuyer={updateBuyer}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/supplierdashboard/*"
          element={
            isSupplier ? (
              <SellerDashboard
                updateLoggedIn={updateLoggedIn}
                isLoggedIn={isloggedIn}
                isSupplier={isSupplier}
                suppliers={suppliers}
                useType={useType}
                setSuppliers={setSuppliers}
                handleUpdateSupplier={handleUpdateSupplier}
                deleteSuppliers={deleteSuppliers}
                updateSupplier={updateSupplier}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route exact path="/signup" element={<Signup />} />
        {/* <Route exact path="/supplier-signup" render={() => <Signup useType={useType} usingType={usingType} />} /> */}
        <Route path="/buyers" element={<Buyer />} />
        <Route path="/suppliers" element={<Seller />} />
        <Route path="/buyer-forms" element={<BuyerForm />} />
        <Route path="/seller-forms" element={<SellerForm />} />
        <Route path="/buyer-requests" element={<BuyerFormRequests />} />
        <Route path="/supplier-requests" element={<SellerFormRequests />} />
      </Routes>
    </Router>
  );
}

export default App;
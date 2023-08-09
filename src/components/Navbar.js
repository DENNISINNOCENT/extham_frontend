import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { OmsContext } from './auth/AuthContext';

const Navbar = ({updateLoggedIn, userType, useType}) => {

  const navigate = useNavigate();
  const { backendUrl } = useContext(OmsContext);

  function handleLogout() {
    fetch(`${backendUrl}/logout`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          // Clear user data from local storage
          localStorage.removeItem('user');

          // Update logged-in state
          updateLoggedIn(false);

          // Navigate to the desired page
          navigate('/');
        } else {
          // Handle error response
          throw new Error('Logout failed');
        }
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  }

  return (
    <nav className='bg-white border-gray-200 mx-2 px-2 py-2.5 rounded dark:bg-gray-800'>
      <div className='container flex justify-between items-center mx-auto pt-3'>
        <div className='flex items-center'>
        <span style={{ marginLeft: "25rem" }} className='text-xl font-medium whitespace-nowrap dark:text-white'>
            Welcome To {userType === 'broker' ? 'Broker' : (useType === 'supplier' ? 'Supplier' : 'Buyer')} Dashboard
          </span>
        </div>
        <div className='flex items-center'>
          <button
            className="text-sm text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded-full"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

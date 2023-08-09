import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { FaWpforms } from 'react-icons/fa';

const BuyerSide = ({ dashboardType }) => {
  const [open, setOpen] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();



  const Menus = [
    { title: 'Buyer Forms', path: '/buyer-requests', src: <FaWpforms /> },
  ];

  return (
    <>
      <div
        className={`${
          open ? 'w-60' : 'w-fit'
        } hidden sm:block fixed top-0 left-0 h-screen duration-300 bg-gray-800 border-r border-gray-200 dark:border-gray-600 p-5 dark:bg-slate-800`}
        style={{
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollbarWidth: 'thin',
          scrollbarColor: '#4A5568 #1A202C',
        }}
      >
        <BsArrowLeftCircle
          className={`${
            !open && 'rotate-180'
          } absolute text-3xl bg-white fill-gray-400 rounded-full cursor-pointer top-9 -right-1 mr-2 dark:fill-gray-400 dark:bg-gray-800`}
          onClick={() => setOpen(!open)}
        />

        <ul
          className="pt-6"
          style={{
            maxHeight: 'calc(100vh - 200px)',
            '&:hover': {
              overflowY: 'auto', // Show vertical scrollbar on hover
            },
          }}
        >
          {Menus.map((menu, index) => (
            <li
              key={index}
              className={`flex items-center gap-x-6 p-2 text-base font-normal rounded-lg cursor-pointer dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700
              ${menu.gap ? 'mt-9' : 'mt-2'} ${
                location.pathname ===
                `/${dashboardType}dashboard${menu.path}`
                ? 'bg-black-200 dark:bg-gray-700'
                : ''
              }`}
              style={{
                marginRight: '10', // Add margin-right to move the menus from the right side
              }}
            >
              <Link
                to={`/${dashboardType}dashboard${menu.path}`}
                className="flex items-center gap-x-2"
              >
                <span className="text-2xl">{menu.src}</span>
                <span
                  className={`${
                    !open && 'hidden'
                  } origin-left duration-300 hover:block`}
                >
                  {menu.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="sm:hidden">
        <div
          className={`${
            mobileMenu ? 'flex' : 'hidden'
          } absolute z-50 flex-col items-center self-end py-8 mt-16 space-y-6 font-bold sm:w-auto left-6 right-6 dark:text-white  bg-gray-50 dark:bg-slate-800 drop-shadow md rounded-xl`}
        >
          {Menus.map((menu, index) => (
            <Link
              to={`/${dashboardType}dashboard${menu.path}`}
              key={index}
              onClick={() => setMobileMenu(false)}
            >
              <span
                className={`${
                  location.pathname ===
                  `/${dashboardType}dashboard${menu.path}`
                  ? 'bg-gray-200 dark:bg-gray-700'
                  : ''
                } p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700`}
              >
                {menu.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default BuyerSide;

import React from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Link, useLocation } from 'react-router-dom';  // Use the useLocation hook

export const Sidebar = () => {
  const location = useLocation();  // Get the current location

  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <Link to={"/add"} className={`sidebar-option ${location.pathname === "/add" ? "active-link" : ""}`}>
          <img src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </Link>

        <Link to={"/list"} className={`sidebar-option ${location.pathname === "/list" ? "active-link" : ""}`}>
          <img src={assets.order_icon} alt="" />
          <p>List Items</p>
        </Link>

        <Link to={"/orders"} className={`sidebar-option ${location.pathname === "/orders" ? "active-link" : ""}`}>
          <img src={assets.order_icon} alt="" />
          <p>Orders</p>
        </Link>
      </div>
    </div>
  );
}

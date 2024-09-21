import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const {getTotalCardAmount,token}=useContext(StoreContext);


  const handleLogout = async () => {
    try {
      const res = await axios.get('https://food-delivery-as2s.onrender.com/api/user/logout', {
        withCredentials: true,
      });

      if (res.status === 200) {
        toast.success(res.data.message);
        localStorage.removeItem("token");
        window.location.reload(); // Optional: reload the page to clear any user-specific state
      }
    } catch (error) {
      // Handle error properly
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="navbar">
      <Link to={"/"}><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbar-menu cursor-pointe">
        <Link to={"/"} className="cursor-pointer">
          <li
            className={`${menu === "home" ? "active" : ""} `}
            onClick={() => setMenu("home")}
          >
            home
          </li>
        </Link>

        <a
        href="#explore-menu"
          className={`${menu === "menu" ? "active" : ""} `}
          onClick={() => setMenu("menu")}
        >
          menu
        </a>
        <a
          className={`${menu === "mobile-app" ? "active" : ""} `}
          onClick={() => setMenu("mobile-app")}
          href="#app-download"
        >
          mobile-app
        </a>
        <a
          href="#footer"
          className={`${menu === "contact-us" ? "active" : ""} `}
          onClick={() => setMenu("contact-us")}
        >
          contact us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to={"/cart"}><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCardAmount()>0?"dot":""}></div>
        </div>
       {!token ? <button onClick={() => setShowLogin(true)}>sign in</button>
       :<div className="navbar-profile">
        <img src={assets.profile_icon} alt="" />
        <ul className="navbar-drop-down">
          <li>
            <img src={assets.bag_icon} alt="" />
            <Link to={'/myorders'}>Orders</Link>
          
          </li>
          <hr />
          <li onClick={handleLogout}><img src={assets.logout_icon} alt="" />
          <p>LogOut</p>
          </li>
        
        </ul>
        </div>}
      </div>
    </div>
  );
};

export default Navbar;

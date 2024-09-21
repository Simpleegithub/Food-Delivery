import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

export const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga nam
            magni eligendi nostrum, veritatis recusandae, facilis tempora
            deleniti quis ea praesentium saepe cupiditate perspiciatis
            repudiandae, et ab illo vero natus.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
           
          </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+92 1234567890</li>
                <li>contact@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright &copy; 2022 All rights reserved</p>
    </div>
  );
};

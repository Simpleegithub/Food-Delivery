import React, { useContext, useEffect, useState } from 'react';
import './LoginPopUp.css';
import { assets } from '../../assets/assets';
import {toast} from "react-toastify";
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';

export const LoginPopUp = ({setShowLogin}) => {
  const {token,setToken}=useContext(StoreContext);
    const [currState, setCurrState] = useState("Log In");
    const [data,setData]=useState({
        name:"",
        email:"",
        password:""
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
    }

    const handleRegisterAndLogin = async(e) => {
        e.preventDefault();
      if(currState === "Sign Up"){
          try{
            const res=await axios.post("http://localhost:4000/api/user/register",{
                name:data.name,
                email:data.email,
                password:data.password
            },{
                withCredentials:true
            });
            if(res.status===200){
                toast.success("Account created successfully");
                setShowLogin(false);
            }

          } catch(error){
            console.log(error);
            

          }
      }

      if(currState === "Log In"){
        try{
          const res=await axios.post("http://localhost:4000/api/user/login",{
              email:data.email,
              password:data.password
          },{
              withCredentials:true
          });
          if(res.status===200){
              toast.success("Logged in successfully");
              setShowLogin(false);
              setToken(res.data.token);
              localStorage.setItem("token",res.data.token);
          }

        } catch(error){
          console.log(error);
          toast.error(error.response.data.message);


        }

      }
   

    }



  return (
    <div className='login-popup'>
        <form action="" className="login-popup-container">
         <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
         </div>
         <div className="login-popup-inputs">
          { currState === "Sign Up" &&  <input type="text" name='name' required placeholder='Your Name' onChange={handleChange} value={data.name} />}
            <input type="email" required placeholder='Your email' name='email' onChange={handleChange} value={data.email} />
            <input type="password" placeholder='Password' name='password' onChange={handleChange} value={data.password} />
         </div>
         <button onClick={handleRegisterAndLogin}>{currState === "Sign Up" ? "Create Account" : "Log In"}</button>
         <div className="logIn-Popup-Condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the Terms of Service and Privacy Policy</p>
         </div>
       { currState === "Log In" &&  <p>Create a new account <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>}
        { currState === "Sign Up" && <p>Already have an account <span onClick={() => setCurrState("LogIn")}>? Log In</span></p>}
        </form>
    </div>
  )
}

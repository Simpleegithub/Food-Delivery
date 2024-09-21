import React, { useEffect } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success=searchParams.get('success');
    const orderId=searchParams.get('orderId');
    console.log(success,orderId);
    const navigate=useNavigate();


    const VerifyPayment = async () => {

      try{
        const res = await axios.post(`http://localhost:4000/api/order/verify`,{
          success,
          orderId
        },{
          withCredentials:true,
          headers:{
            token:localStorage.getItem("token"),
          }
        });
        console.log(res.data);
        if(res.data.success){
          console.log(res.data.success);
          navigate("/myorders");
        } else{
          navigate("/")
        }

      } catch(error){
        console.log(error);
      }

    }

    useEffect(() => {
      VerifyPayment();
    }, [])
    
  return (
    <div className='verify'>
     <div className='spinner'>

     </div>
    </div>
  )
}

export default Verify
import React from "react";
import "./Orders.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets.js";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  console.log(orders, "Hi my orders");

 

  const fetchOrders = async () => {
    try {
      const res = await axios.get("https://food-delivery-as2s.onrender.com/api/order/list");
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
      toast.error("error");
    }
  };

  const statusHandler= async(e,orderId)=>{

    try{

      const res = await axios.post(`https://food-delivery-as2s.onrender.com/api/order/status`,{
        orderId,
        status:e.target.value
      }, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      fetchOrders();
    }catch(error){
      toast.error(error.response.data.message);
    }


  }

  useEffect(() => {
   
    fetchOrders();
  }, []);
  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order) => {
          return (
            <div className="order-item" key={order._id}>
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ", ";
                    }
                  })}
                </p>
                <p className="order-item-name">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div className="order-item-address">
                  <p>{order.address.street + ","}</p>
                  <p>
                    {order.address.city +
                      ", " +
                      order.address.state +
                      ", " +
                      order.address.country +
                      ", " +
                      order.address.zipcode}
                  </p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>Total: ${order.amount}</p>
              <select onChange={(e)=>statusHandler(e,order._id)} value={order.status}>
                <option value="Food Processing"> Food Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;

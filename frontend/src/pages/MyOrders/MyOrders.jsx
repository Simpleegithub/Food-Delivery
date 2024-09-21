import React, { useContext, useEffect, useState } from "react";

import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { token } = useContext(StoreContext);
  console.log(data, "hello");
  const fetchOrders = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/order/userorders",
        {},
        {
          headers: {
            token,
          },
        },
        {
          withCredentials: true,
        }
      );
      console.log(res, "hello from response orders");
      setData(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => (
          <div key={index} className="my-orders-order">
            <img src={assets.parcel_icon} alt="" />
            <p>
              {order.items.map((item, idx) => {
                if (idx === order.items.length - 1) {
                  return item.name + " x " + item.quantity;
                } else {
                  return item.name + " x " + item.quantity + ",";
                }
              })}
            </p>
            <p>${order.amount}.00</p>
            <p>Items:{order.items.length}</p>
            <p>
              <span>&#x25cf;</span> <b>{order.status}</b>
            </p>
            <button onClick={fetchOrders}>Track Order</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;

import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { getTotalCardAmount, token, food_list, cartItems } =
    useContext(StoreContext);
  console.log(food_list, "from place order");
  console.log(cartItems, "from cardItem order");
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    console.log(data, "from data");
  }, [data]);

  const onChangehandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Fix the typo here
    // alert('Order Placed');
    // Add your logic for placing the order here
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    //  console.log(orderItems,'han g')
    let OrderData = {
      address: data,
      Items: orderItems,
      amount: getTotalCardAmount() + 2,
    };

    const res = await axios.post(
      "http://localhost:4000/api/order/place",
      OrderData,
      {
        headers: {
          token: token, // You can also use 'Authorization': `Bearer ${token}` if that's how your backend expects it
        },
        withCredentials: true, // This should be inside the same object
      }
    );

    if (res.status === 200) {
      const { session_url } = res.data;
      window.location.href = session_url;
    } else {
      alert("something went wrong");
    }
  };
  useEffect(()=>{

    if(!token){
      navigate("/cart")
    } else if(getTotalCardAmount()==0){
       navigate("/cart")
    }

  },[token])

  return (
    <form className="place-order" onSubmit={onSubmitHandler}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            onChange={onChangehandler}
            name="firstName"
            value={data.firstName}
            type="text"
            placeholder="First Name"
          />
          <input
            required
            onChange={onChangehandler}
            name="lastName"
            value={data.lastName}
            type="text"
            placeholder="Second Name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangehandler}
          value={data.email}
          type="email"
          placeholder="Email Address"
        />
        <input
          required
          name="street"
          onChange={onChangehandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangehandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onChangehandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            name="zipcode"
            onChange={onChangehandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip Code"
          />
          <input
            required
            name="country"
            onChange={onChangehandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangehandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />
      </div>
      {/* right side  */}
      <div className="place-order-right">
        <div className="card-total">
          <h2>Card Totals</h2>
          <div>
            <div className="card-total-details">
              <p>SubTotal</p>
              <p>${getTotalCardAmount()}</p>
            </div>
            <hr />
            <div className="card-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCardAmount() > 0 ? 2 : 0}</p>
            </div>
            <hr />
            <div className="card-total-details">
              <p>Total</p>
              <p>${getTotalCardAmount() > 0 ? getTotalCardAmount() + 2 : 0}</p>
            </div>
          </div>
          {/* The button inside a form will naturally submit the form, so no need to handle onClick */}
          <button type="submit">Proceed to Checkout</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

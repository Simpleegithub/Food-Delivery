import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";

import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, setCartitems, addToCart, removeFromCart,getTotalCardAmount,food_list } =
    useContext(StoreContext);
    const navigate=useNavigate();
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-item-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id]) {
            return (
              <>
                <div className="cart-item-title card-items-item" key={item.id}>
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>${cartItems[item._id]}</p>
                  <p>{item.price * cartItems[item._id]}</p>
                  <p className="cross" onClick={() => removeFromCart(item._id)}>x</p>
                </div>
                <hr />
              </>
            );
          }
        })}
      </div>
      <div className="card-bottom">
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
            <p>${getTotalCardAmount()>0?2:0}</p>
          </div>
          <hr />
          <div className="card-total-details">
            <p>Total</p>
            <p>${getTotalCardAmount()>0?getTotalCardAmount()+2:0}</p>
          </div>
    
        </div>
          <button onClick={() => navigate("/order")}>Proceed to Checkout</button>
       </div>
       <div className="card-promocode">
        <div>
          <p>If you have a promo code enter it here</p>
          <div className="card-promocode-input">
          <input type="text" placeholder="promo code" />
          <button>Submit</button>
          </div>
        </div>
       </div>
      </div>
    </div>
  );
};

export default Cart;

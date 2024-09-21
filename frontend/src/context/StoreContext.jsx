import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartitems] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token"));

  console.log(cartItems,'i am cartitems')

  const addToCart = async (itemId) => {
    const updatedCart = {
      ...cartItems,
      [itemId]: cartItems[itemId] ? cartItems[itemId] + 1 : 1,
    };
    setCartitems(updatedCart);

    if (token) {
      // alert('hello')
      await axios.post(
        "http://localhost:4000/api/cart/add",
        {
          itemId,
        },
        {
          headers: {
            token,
          },
        }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartitems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (token) {
      await axios.post(
        "http://localhost:4000/api/cart/remove",
        {
          itemId,
        },
        {
          headers: {
            token,
          },
        }
      );
    }
  };

  const getTotalCardAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((food) => food._id === item);
        totalAmount += cartItems[item] * itemInfo?.price;
      }
    }
    return totalAmount;
  };

  // Update localStorage whenever cartItems changes
  // useEffect(() => {
  //   localStorage.setItem("cartItems", JSON.stringify(cartItems));
  //   console.log(cartItems);
  // }, [cartItems]);

  useEffect(() => {
    const fetchFoodList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/food/list",
          {
            withCredentials: true,
          }
        );

        setFoodList(response.data.foods);
        console.log(response.data.foods, "from foods");
      } catch (error) {
        console.error("Error fetching food list:", error);
      }
    };

    const loadCartDataofUser = async () => {
      if (token) {
        const response = await axios.get("http://localhost:4000/api/cart/get", {
          headers: {
            token,
          },
        });
        setCartitems(response.data.cartData);
        // console.log(response.data.cartData, "hello sunnyleony");
      }
    };

    fetchFoodList();
    loadCartDataofUser();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartitems,
    addToCart,
    removeFromCart,
    getTotalCardAmount,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

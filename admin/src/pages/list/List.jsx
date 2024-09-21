import React from "react";
import "./List.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

const List = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      const res = await axios.get("https://food-delivery-as2s.onrender.com/api/food/list");
      if (res.status === 200) {
        setList(res.data.foods);
      } else {
        toast("Something went wrong");
      }
    };

    fetchList();
  }, []);

  const handleDelete = async (id) => {
  try{
    const res = await axios.delete(`https://food-delivery-as2s.onrender.com/api/food/remove/${id}`);
    if(res.status === 200){
      toast.success(res.data.message);
      setList(list.filter((item) => item._id !== id));
    }

  } catch(error){
    toast.error(error.response.data.message);

  }


  };
  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.map((item) => (
         
         <div key={item._id} className="list-table-format">
           <img src={item.image} alt="" />
           <p>{item.name}</p>
           <p>{item.category}</p>
           <p>${item.price}</p>
           <p className="cursor" onClick={() => handleDelete(item._id)}>X</p>
         </div>

        ))}
      </div>
    </div>
  );
};

export default List;

import React from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: "",
  });

  const OnchangeHandler = (e) => {
    const name = e.target.name;
    setData({ ...data, [name]: e.target.value });
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("price", Number(data.price));
      formData.append("image", image);

      const res = await axios.post(
        "https://food-delivery-as2s.onrender.com/api/food/add",
        formData
      );

      if (res.status === 200) {
        // alert("Product Added");
        setData({
          name: "",
          description: "",
          category: "Salad",
          price: "",
        });
        setImage(false);
        toast.success(res.data.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="add">
      <form action="" className="flex-col" onSubmit={handleSubmit}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={OnchangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            name="description"
            rows={6}
            placeholder="Write Content here"
            required
            onChange={OnchangeHandler}
            value={data.description}
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              onChange={OnchangeHandler}
              value={data.category}
              name="category"
              id=""
            >
              <option value="Salad">Salad</option>
              <option value="Rolls"> Rolls</option>
              <option value="Deserts"> Deserts</option>
              <option value="Sandwich"> Sandwich</option>
              <option value="Cake"> Cake</option>
              <option value="Pure Veg"> Pure Veg</option>
              <option value="Pasta"> Pasta</option>
              <option value="Noodles"> Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={OnchangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="$20"
            />
          </div>
        </div>
        {loading ? (
          <button type="submit" className="add-btn" disabled>
            Adding...
          </button>
        ) : (
          <button type="submit" className="add-btn">
            Add
          </button>
        )}
      </form>
    </div>
  );
};

export default Add;

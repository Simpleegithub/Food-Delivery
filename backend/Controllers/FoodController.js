import FoodModel from "../Models/FoodModel.js";
import  cloudinary  from "../config/cloudinary.js"; // Ensure you import correctly
import fs from "fs";

// Add Food
const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    let image_filename = req.file.path;  // Use file path

    // Upload image to Cloudinary
    const imageResult = await cloudinary.uploader.upload(image_filename);
    const imageUrl = imageResult.url;

    // Save food item to the database
    const food = new FoodModel({
      name,
      description,
      price,
      image: imageUrl,  // Use the Cloudinary URL
      category,
    });
    await food.save();

    res.status(200).json({
      success: true,
      message: "Food added successfully",
    });

  } catch (error) {
    console.error("Error occurred while adding food:", error);  // Improved error logging
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message || error,  // Return error message to client
    });
  }
};



// All Food listed in database
const allFoodListed = async (req, res) => {
  try {
    const foods = await FoodModel.find();
    res.status(200).json({
      success:true,
      foods
      
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message || error,  // Return error message to client
    });
}

};


// Delete Food Items 

const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await FoodModel.findByIdAndDelete(id);
    // fs.unlink(`uploads/${food?.image}`, (err) => {
    //   if (err) {
    //     console.error("Error deleting image:", err);
    //   }
    // });
    

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    res.status(200).json({
      success: true,  
      message: "Food deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message || error,  // Return error message to client
    });
  }

};

export { addFood,allFoodListed,deleteFood };

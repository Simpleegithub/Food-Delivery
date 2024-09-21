import express from "express";
import { addFood, allFoodListed, deleteFood } from "../Controllers/FoodController.js";
import multer from "multer";



const FoodRouter = express.Router();

// image storage engine
const storage=multer.diskStorage({
destination:"uploads",
filename:(req,file,cb)=>{
   return cb(null,`${Date.now()}-${file.originalname}`)
}

})

const upload=multer({storage:storage})

FoodRouter.post('/add',upload.single('image'),addFood);
FoodRouter.get('/list',allFoodListed);
FoodRouter.delete('/remove/:id',deleteFood);




export default FoodRouter;
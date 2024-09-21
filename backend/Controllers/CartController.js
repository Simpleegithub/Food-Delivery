import UserModel from '../Models/UserModel.js';


// add items to user cart
export const AddToCart = async (req, res) => {
  console.log(req.body);

    try{
        const user = await UserModel.findById(req._id);
        let cartData=user.cartData;
        if(cartData[req.body.itemId]){
            cartData[req.body.itemId] = cartData[req.body.itemId] += 1;
        }else{
            cartData[req.body.itemId] = 1;
        }

        user.cartData = cartData;
        await UserModel.findByIdAndUpdate(user._id, user);

        res.status(201).json({message:"Item added to cart"});

    }catch(error){
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }


}


// remove items from user cart
export const RemoveFromCart = async (req, res) => {
    try {
      console.log("HI THERE");
      // Find the user by their ID
      const user = await UserModel.findById(req._id);
      let cartData = user.cartData || {};
  
      // Check if the item exists in the cart and decrement or delete
      if (cartData[req.body.itemId] && cartData[req.body.itemId] > 1) {
        cartData[req.body.itemId] -= 1;  // Decrement item count
      } else {
        delete cartData[req.body.itemId]; // Remove the item if count reaches 0 or less
      }
  
      // Update the cartData in the user document
      user.cartData = cartData;
      await UserModel.findByIdAndUpdate(user._id, { cartData });
  
      res.status(201).json({ message: "Item removed from cart" });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  
// get Cart

export const GetCart = async (req, res) => {

    try{
        const user=await UserModel.findById(req._id);
        let cartData=user.cartData;

        res.status(201).json({success:true,cartData:cartData});

    }catch(error){

        res.status(500).json({message:"Something went wrong"});

    }



}



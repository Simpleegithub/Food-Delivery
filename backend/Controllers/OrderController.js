import OrderModel from "../Models/OrderModel.js";
import UserModel from "../Models/UserModel.js";
import Stripe from "stripe";

// setup stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const PlaceOrder = async (req, res) => {
  try {
    // console.log(req.body);
    const userId=req._id;
    const items = req.body.Items;
    const address = req.body.address;
    const amount=req.body.amount;
    console.log(items,address,amount);
    
    const newOrder = new OrderModel({
      userId,
      items,
      amount,
      address,
    });

    await newOrder.save();
    await UserModel.findByIdAndUpdate(req._id, {
      cartData: {},
    });

    // create payment intent
    const line_items = items.map((item) => ({
        price_data:{
            currency:'usd',
            product_data:{
                name:item.name
            },
            unit_amount:item.price*100
        },
        quantity:item?.quantity
    
        
    }))

    line_items.push({
        price_data:{
            currency:'usd',
            product_data:{
                name:"Delivery Charges"
            },
            unit_amount:2*100
        },
        quantity:1
    })

    console.log(line_items)



    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `https://food-delivery-admin-5brw.onrender.com/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: "https://food-delivery-admin-5brw.onrender.com/verify?success=false",
    });


    res.status(200).json({ session_url: session.url });




  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};



// Verify Order

export const VerifyOrder = async (req, res) => {
const {orderId,success}=req.body;
console.log(orderId,success);
try{
  if(success){
    await OrderModel.findByIdAndUpdate(orderId, {
      payment:true
    })
  
    res.status(200).json({success:true,message:"Paid"});
  } else{
     await OrderModel.findByIdAndDelete(orderId);
  
    res.status(200).json({success:false,message:"Failed"});
  
  }
  

} catch(error){
  console.log(error);
  res.status(500).json({error:error.message});

}

}


// User orders for frontend

export const UserOrders = async (req, res) => {

  try{
    const orders=await OrderModel.find({userId:req._id});

     res.status(200).json({success:true,orders});

  } catch(error){
    console.log(error);
    res.status(500).json({error:error.message});

  }


}


// listing orders for admin panel

export const listOrders =async (req,res)=>{

  try{
    const orders=await OrderModel.find({});

    res.status(200).json({
      success:true,
      orders
    })

  } catch(error){
    console.log(error);
    res.status(500).json({
      success:false,
      message:"Error"
    })
  }
}


// updating the status

export const UpdateStatus = async (req, res) => {
  const { orderId, status } = req.body;

  try{

    await OrderModel.findByIdAndUpdate(orderId, {
      status
    })

    res.status(200).json({success:true,message:"Updated"});

  } catch(error){
    console.log(error);
    res.status(500).json({error:error.message});

  }

 

}

        

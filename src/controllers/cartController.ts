import { Request, Response } from "express";
import userModel from "../models/userModel";
import { log } from "console";

// add product to user cart
const addToCart = async (req: Request, res: Response) => {
  try {
    const { userId, itemId, size } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = await userData!.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added to Cart" });
    return 
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      res.status(400).json({ success: false, message: error.message });
    return 

    } else {
      res
        .status(400)
        .json({ success: false, message: "An unknown error occurred" });
    return 

    }
  }
};

// update user cart
const updateCart = async (req: Request, res: Response) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = await userData!.cartData;
    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
     console.log(error);

    if (error instanceof Error) {
      res.status(400).json({ success: false, message: error.message });
    } else {
      res
        .status(400)
        .json({ success: false, message: "An unknown error occurred" });
    }
  }
};

//  get user cart data
const getUserCart = async (req: Request, res: Response) => {
    try {
        const {userId}=req.body;
 const userData = await userModel.findById(userId);
    let cartData = await userData!.cartData;

    res.json({ success: true,cartData });

    } catch (error) {
       console.log(error);

    if (error instanceof Error) {
      res.status(400).json({ success: false, message: error.message });
    } else {
      res
        .status(400)
        .json({ success: false, message: "An unknown error occurred" });
    }
   
    }
};

export { addToCart, updateCart, getUserCart };

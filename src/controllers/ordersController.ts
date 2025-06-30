import { Request, Response } from "express";
import orderModel from "../models/orderModel";
import userModel from "../models/userModel";
import Stripe from "stripe";

// global variables

const currency = "inr";
const deliveryCharge = 10;
// getway initialize

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Placing orders using COD Method
const placeOrder = async (req: Request, res: Response) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
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

// Placing orders using Strip Method
const placeOrderStrip = async (req: Request, res: Response) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item:any) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
  price_data: {
    currency: currency,
    product_data: {
      name: 'Delivery Charges'
    },
    unit_amount: deliveryCharge * 100
  },
  quantity: 1
});

const session = await stripe.checkout.sessions.create({
  success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
  cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
  line_items,
  mode: 'payment',
});

res.json({ success: true, session_url: session.url });

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

// Placing orders using Razorpay Method
const placeOrderRazorpay = async (req: Request, res: Response) => {};

// All Orders data for Admin Panel
const AllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
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

// All Orders Data for Frontend
const userOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });

    res.json({ success: true, orders });
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

// update order status from Admin Panel
const UpdateStatus = async (req: Request, res: Response) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });

    res.json({ success: true, message: "Status Updated" });
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
export {
  placeOrder,
  placeOrderStrip,
  placeOrderRazorpay,
  AllOrders,
  UpdateStatus,
  userOrders,
};

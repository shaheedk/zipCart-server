import express from 'express'

import {placeOrder,placeOrderStrip,placeOrderRazorpay,AllOrders,UpdateStatus, userOrders, verifyStripe, verifyRazorpay} from '../controllers/ordersController'
import adminAuth from '../middleware/AdminAuth'
import authUser from '../middleware/Auth'

const orderRouter=express.Router()

// admin features 
orderRouter.post('/list',adminAuth,AllOrders)
orderRouter.post('/status',adminAuth,UpdateStatus)

// payment fetures 
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStrip)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)

// user feture 
orderRouter.post('/userorders',authUser,userOrders)

// verify payment 
orderRouter.post('/verifyStripe',authUser,verifyStripe)
orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay)

export default orderRouter;

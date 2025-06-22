import express from "express";
import {addProducts,listProducts,removeProduct,singleProduct} from '../controllers/productController'

const productRouter=express.Router();

productRouter.post('/add',addProducts)
productRouter.post('/remove',removeProduct)
productRouter.post('/single',singleProduct)
productRouter.get('/list',listProducts)


export default productRouter
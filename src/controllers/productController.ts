import { Request,Response } from "express"
import {v2 as cloudinary} from 'cloudinary'




// function add products 
const addProducts=async (req:Request,res:Response):Promise<void>=>{
try {
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };
    const {name,description,price,category,subCategory,sizes,bestSeller}=req.body

    const image1 = files.image1&& files.image1?.[0];
    const image2 = files.image2&& files.image2?.[0];  
    const image3 = files.image3&& files.image3?.[0];
    const image4 = files.image4&& files.image4?.[0];
    
const images=[image1,image2,image3,image3].filter((item)=>item!==undefined)

const imagesurl=await Promise.all(
    images.map((async(items,index)=>{
        let result=await cloudinary.uploader.upload(items.path,{resource_type:'image'})
        return result.secure_url
    }))
)
console.log(name,description,price,category,subCategory,sizes,bestSeller)
console.log(images);
res.json({})

} catch (error) {
    console.log(error)
   if (error instanceof Error) {
      res.status(400).json({ success: false, message: error.message });
    } else {
      res
        .status(400)
        .json({ success: false, message: "An unknown error occurred" });
    }
}
}

// function for list products 
const listProducts=async (req:Request,res:Response):Promise<void>=>{

}

// function for remove product 
const removeProduct=async (req:Request,res:Response):Promise<void>=>{

}

// function single product info 
const singleProduct=async (req:Request,res:Response):Promise<void>=>{

}

export {addProducts,listProducts,removeProduct,singleProduct}
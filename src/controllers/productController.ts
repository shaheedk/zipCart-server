import { Request,Response } from "express"




// function add products 
const addProducts=async (req:Request,res:Response):Promise<void>=>{
try {
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };
    const {name,description,price,category,subCategory,sizes,bestSeller}=req.body

    const image1 = files.image1?.[0];
    const image2 = files.image2?.[0];  
    const image3 = files.image3?.[0];
    const image4 = files.image4?.[0];
console.log(name,description,price,category,subCategory,sizes,bestSeller)
console.log(image1,image2,image3,image4);
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
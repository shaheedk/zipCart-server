import { Request, Response } from "express";
import userModel from "../models/userModel";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id: string) => {
  const secret = process.env.JWT_SECRET;

  return jwt.sign({ id }, secret!);
};

// Route for user login
const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({email});
    if (!user) {
      res.json({ success: false, message: "User doesn't exists" });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(isMatch){
        const token=createToken(user._id)
        res.json({success:true,token})
   
    }else{
        res.json({success:false,message:'invalid credientials'})
    }
  } catch (error) {
   if (error instanceof Error) {
      res.status(400).json({ success: false, message: error.message });
    } else {
      res
        .status(400)
        .json({ success: false, message: "An unknown error occurred" });
    }
  }
};

// Route for user registration
const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    //  verify the user already axist or not
    const exists = await userModel.findOne({ email });
    if (exists) {
      res.json({ success: false, message: "User already exists" });
      //   validate email format and strong password
    }
    if (!validator.isEmail(email)) {
      res.json({ success: false, message: "Please enter a valid email" });
    }
    if (password.length < 8) {
      res.json({ success: false, message: "Please enter a strong password" });
      
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id as string);
    res.json({ success: true, token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ success: false, message: error.message });
    } else {
      res
        .status(400)
        .json({ success: false, message: "An unknown error occurred" });
    }
  }
};

// Route for admin login
const adminLogin = async (req: Request, res: Response): Promise<void> => {
try {
    const {email,password}=req.body
    if(email===process.env.ADMIN_EMAIL&&password===process.env.ADMIN_PASSWORD){
const token=jwt.sign(email+password,process.env.JWT_SECRET!);
res.json({success:true,token})
    }else{
       res.json({success:false,message:'invalid credentials'})

    }
} catch (error) {
     if (error instanceof Error) {
      res.status(400).json({ success: false, message: error.message });
    } else {
      res
        .status(400)
        .json({ success: false, message: "An unknown error occurred" });
    }
}
};

export { loginUser, registerUser, adminLogin };

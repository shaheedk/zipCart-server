import express, { Request, Response } from "express";
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb";
import connectCloundinary from "./config/cloudinary";
import userRouter from "./routes/userRoutes";
import productRouter from "./routes/productRoute";
import cartRouter from "./routes/cartRouter";

// app config 
const app = express();
const port=process.env.PORT||3000

connectDB()
connectCloundinary()
// middleweres 
app.use(express.json())
app.use(cors())

// api endpoints 
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)

app.get("/", (req: Request, res: Response) => {
  res.send("Api Working");

  
});


app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the type of the cartData if possible (here is an example structure)
interface CartData {
  [productId: string]: {
    [size: string]: number;
  };
}

// Define User interface
interface User extends Document {
  _id:string;
  name: string;
  email: string;
  password: string;
  cartData: CartData;
}

// Define schema
const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Schema.Types.Mixed, default: {} }, // or use Map/Object if structure known
  },
  { minimize: false }
);

// Fix model creation (check for existing model first)
const userModel: Model<User> = mongoose.models.user || mongoose.model<User>('user', userSchema);

export default userModel;

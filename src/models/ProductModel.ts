import mongoose, { Document, Model } from 'mongoose';

interface Product extends Document {
  name: string;
  description: string;
  price: number;
  images: { type: [String], required: true },    
  category: string;
  subCategory: string;
  size: string[];        
  bestseller?: boolean;
  date: number;
}

const productSchema = new mongoose.Schema<Product>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: [String], required: true },      
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  size: { type: [String], required: true },
  bestseller: { type: Boolean },
  date: { type: Number, required: true },
});

const productModel: Model<Product> =
  mongoose.models.product || mongoose.model<Product>('product', productSchema);

export default productModel;

import { ObjectId } from "mongodb";
import { ProductTypeWithId } from "./productTypes";

export type WishlistType = {
  userId: ObjectId;
  productId: ObjectId;
  createdAt: string;
  updatedAt: string;
};

export type WishlistWithProductType = {
  _id: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  product: ProductTypeWithId;
  createdAt: string;
  updatedAt: string;
};

export type ProductIdParams = {
  params: Promise<{ productId: string }>;
};

export type WishlistCardProps = {
  product: ProductTypeWithId;
};

export type ProductTypeWithIdString = {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
};

export type WishlistApiReslut = {
  wishlist: WishlistWithProductType[];
  name: string;
  username: string;
  message: string;
};

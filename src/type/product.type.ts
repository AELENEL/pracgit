// src/types/product.types.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  stock: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductState {
  products: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: any | null;
}

export type ProductFormData = Omit<Product, "id" | "createdAt" | "updatedAt">;

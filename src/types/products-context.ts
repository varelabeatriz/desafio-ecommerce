import type { Dispatch, SetStateAction } from "react";
import type { Category, Product } from "./product";

export type ProductsContextValue = {
  products: Product[];
  categories: Category[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  getData: (query?: string) => Promise<void>;
  getCategories: () => Promise<void>;
  getProductsByCategory: (category: string) => Promise<void>;
  limit: number;
  skip: number;
  total: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: () => Promise<void>;
  prevPage: () => Promise<void>;
};

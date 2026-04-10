import { createContext, useContext } from "react";
import type { ProductsContextValue } from "../types/products-context";

export const ProductsContext = createContext<ProductsContextValue | null>(null);

export function useProductsContext(): ProductsContextValue {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("useProductsContext must be used within a ProductsProvider");
  }

  return context;
}

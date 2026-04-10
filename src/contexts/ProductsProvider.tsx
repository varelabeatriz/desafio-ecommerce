import { useState } from "react";
import { ProductsContext } from "./ProductsContext";
import axios from "axios";
import type { ChildrenProps } from "../types/common";
import type { Category, Product, ProductsResponse } from "../types/product";

const PRODUCTS_LIMIT = 12;

function ProductsProvider({ children }: ChildrenProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [currentQuery, setCurrentQuery] = useState("");
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  const totalPages = Math.max(1, Math.ceil(total / PRODUCTS_LIMIT));
  const currentPage = Math.floor(skip / PRODUCTS_LIMIT) + 1;
  const hasPrevPage = skip > 0;
  const hasNextPage = skip + PRODUCTS_LIMIT < total;

  const fetchProducts = async ({
    query = currentQuery,
    category = currentCategory,
    nextSkip = skip,
  }: {
    query?: string;
    category?: string | null;
    nextSkip?: number;
  } = {}): Promise<void> => {
    const normalizedQuery = query.trim();
    const params: Record<string, string | number> = {
      limit: PRODUCTS_LIMIT,
      skip: nextSkip,
    };

    let endpoint = "https://dummyjson.com/products";

    if (normalizedQuery) {
      endpoint = "https://dummyjson.com/products/search";
      params.q = normalizedQuery;
    } else if (category) {
      endpoint = `https://dummyjson.com/products/category/${category}`;
    }

    const { data } = await axios.get<ProductsResponse>(endpoint, { params });

    setProducts(data.products ?? []);
    setTotal(data.total ?? 0);
    setSkip(data.skip ?? nextSkip);
  };

  const getData = async (query = ""): Promise<void> => {
    setCurrentQuery(query);
    setCurrentCategory(null);
    await fetchProducts({ query, category: null, nextSkip: 0 });
  };

  const getProductsByCategory = async (category: string): Promise<void> => {
    try {
      setCurrentCategory(category);
      setCurrentQuery("");
      await fetchProducts({ query: "", category, nextSkip: 0 });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erro ao buscar produtos por categoria", error.message);
        return;
      }

      console.error("Erro ao buscar produtos por categoria", error);
    }
  };

  const nextPage = async (): Promise<void> => {
    if (!hasNextPage) return;

    await fetchProducts({
      query: currentQuery,
      category: currentCategory,
      nextSkip: skip + PRODUCTS_LIMIT,
    });
  };

  const prevPage = async (): Promise<void> => {
    if (!hasPrevPage) return;

    await fetchProducts({
      query: currentQuery,
      category: currentCategory,
      nextSkip: Math.max(0, skip - PRODUCTS_LIMIT),
    });
  };

  const getCategories = async (): Promise<void> => {
    const { data } = await axios.get<Category[]>("https://dummyjson.com/products/categories");
    setCategories(data);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        categories,
        setProducts,
        getData,
        getCategories,
        getProductsByCategory,
        limit: PRODUCTS_LIMIT,
        skip,
        total,
        currentPage,
        totalPages,
        hasNextPage,
        hasPrevPage,
        nextPage,
        prevPage,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export default ProductsProvider;

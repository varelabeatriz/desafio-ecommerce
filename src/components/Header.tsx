import SearchBar from "./SearchBar";
import { useProductsContext } from "../contexts/ProductsContext";
import { useEffect } from "react";
import type { Category } from "../types/product";

function Header() {
  const { categories, getCategories, getProductsByCategory } = useProductsContext();
  const primaryCategories = categories.slice(0, 7);
  const otherCategories = categories.slice(7);

    useEffect(() => {
        getCategories();
        }, []);

        function handleCategoryClick(categorySlug: string) {
            getProductsByCategory(categorySlug);
        }

    return (
      <header className="w-full bg-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          
          <div className="text-2xl font-bold text-blue-950 font-playfair">
            WebMarket
          </div>

          <div className="flex-1 mx-6">
            <SearchBar />
          </div>
        </div>
        <div className="bg-blue-900">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center overflow-x-auto whitespace-nowrap">
              {primaryCategories.map((category: Category) => (
                <button
                  key={category.slug}
                  type="button"
                  className="px-4 py-2 cursor-pointer transition text-white hover:bg-blue-800"
                  onClick={() => handleCategoryClick(category.slug)}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {otherCategories.length > 0 && (
              <div className="relative group shrink-0">
                <button
                  type="button"
                  className="px-4 py-2 text-white hover:bg-blue-800 transition"
                >
                  Outras categorias
                </button>

                <div className="hidden group-hover:block group-focus-within:block absolute right-0 top-full z-20 min-w-52 bg-white rounded-md shadow-lg py-1">
                  {otherCategories.map((category: Category) => (
                    <button
                      key={category.slug}
                      type="button"
                      className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition capitalize"
                      onClick={() => handleCategoryClick(category.slug)}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    );
}

export default Header;

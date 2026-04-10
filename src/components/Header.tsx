import SearchBar from "./SearchBar";
import { useProductsContext } from "../contexts/ProductsContext";
import { useEffect } from "react";
import type { ReactElement } from "react";
import type { Category } from "../types/product";

function Header(): ReactElement {
  const { categories, getCategories, getProductsByCategory, getData } = useProductsContext();
  const primaryCategories = categories.slice(0, 7);
  const otherCategories = categories.slice(7);

    useEffect(() => {
        getCategories();
        }, []);

        function handleCategoryClick(categorySlug: string) {
            getProductsByCategory(categorySlug);
        }

    return (
      <header className="w-full bg-blue-500 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          
          <button
            type="button"
            className="cursor-pointer text-2xl font-bold text-white font-playwrite-ie"
            onClick={() => getData("")}
          >
            E-Commerce
          </button>

          <div className="mx-6 flex flex-1 items-center gap-4">
            <div className="flex-1">
              <SearchBar />
            </div>
            <svg
              aria-hidden="true"
              className="h-7 w-7 shrink-0 cursor-pointer"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.33331 6H19.8672C20.4687 6 20.9341 6.52718 20.8595 7.12403L20.1095 13.124C20.0469 13.6245 19.6215 14 19.1172 14H16.5555H9.44442H7.99998"
                stroke="white"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M2 4H4.23362C4.68578 4 5.08169 4.30341 5.19924 4.74003L8.30076 16.26C8.41831 16.6966 8.81422 17 9.26638 17H19"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="10" cy="20" r="1" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
              <circle cx="17.5" cy="20" r="1" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
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
                  className="flex items-center gap-2 px-4 py-2 text-white hover:bg-blue-800 transition"
                >
                  <span className="font-semibold">Outras Categorias</span>
                  <svg
                    aria-hidden="true"
                    className="h-3 w-3"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 4.5L6 8L10 4.5" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </button>

                <div className="hidden group-hover:block group-focus-within:block absolute right-0 top-full z-20 min-w-52 overflow-hidden rounded-b-md bg-blue-900 shadow-lg">
                  {otherCategories.map((category: Category) => (
                    <button
                      key={category.slug}
                      type="button"
                      className="w-full px-4 py-2 text-left text-white transition hover:bg-blue-800 capitalize"
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

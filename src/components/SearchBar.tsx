import { useState, useEffect } from "react";
import type { ChangeEvent, ReactElement } from "react";
import { useProductsContext } from "../contexts/ProductsContext";

function SearchBar(): ReactElement {
    const [query, setQuery] = useState("");
    const { getData } = useProductsContext();

    useEffect(() => {
        getData();
    }, []);

    function handleSearch(event: ChangeEvent<HTMLInputElement>){
        const searchQuery = event.target.value;
        setQuery(searchQuery);
        getData(searchQuery);
    }

    return (
        <>
            <input type="text" 
            placeholder="Buscar produtos..." 
            className="w-full p-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={query}
            onChange={handleSearch}/>
        </>
    )
}

export default SearchBar;

import React, { useState, useEffect } from "react";
import { useSearchContext } from "../lib/SearchContext";
import { FaSearch } from "react-icons/fa";

export const HeaderSearch = () => {
    const [value, setValue] = useState("");
    const { setSearch, search } = useSearchContext();

    useEffect(() => {
        if (search !== value) {
            setValue(search);
        }
    }, [search]);
    const handleSubmit = (event) => {
        event.preventDefault();
        setSearch(
            value
                .toLocaleLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
        );
    };
    return (
        <form
            className="flex  w-2/4 bg-gray-300 p-1 px-3 text-gray-700 rounded-sm "
            onSubmit={handleSubmit}
        >
            <input
                className="w-full bg-transparent h-full outline-none rounded-sm px-1"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button
                type="submit"
                className="w-1/4 px-4 py-1 bg-accent flex items-center justify-center text-white font-bold rounded-sm"
            >
                <FaSearch />
            </button>
        </form>
    );
};

import React, { createContext, useState, useContext } from "react";

const SearchContext = createContext({
    search: "",
    setSearch: () => {},
});

export const SearchContextProvider = ({ children }) => {
    const [search, setSearch] = useState("");

    return (
        <SearchContext.Provider value={{ setSearch, search }}>
            {children}
        </SearchContext.Provider>
    );
};
export const useSearchContext = () => useContext(SearchContext);

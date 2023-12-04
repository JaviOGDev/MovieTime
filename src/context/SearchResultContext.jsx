import { createContext, useState } from "react";

export const SearchResultContext = createContext();

export const SearchResultProvider = ({ children }) => {
  const [searchResult, setSearchResult] = useState([]);

  const insertSearchResult = (data) => {
    setSearchResult(data);
  };

  return (
    <SearchResultContext.Provider value={{ searchResult, insertSearchResult }}>
      {children}
    </SearchResultContext.Provider>
  );
};

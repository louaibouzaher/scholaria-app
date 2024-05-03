"use client";
import React, { useState, useContext, createContext } from "react";

type ISearch = {
  isSearchOverlayOpen: boolean;
  setIsSearchOverlayOpen: (value: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const SearchContext = createContext<ISearch>({
  isSearchOverlayOpen: false,
  setIsSearchOverlayOpen: () => null,
  searchQuery: "",
  setSearchQuery: () => null,
});
const useSearch = () => useContext(SearchContext);

const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider
      value={{
        isSearchOverlayOpen,
        setIsSearchOverlayOpen,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider, useSearch };

import { createContext, useState, ReactNode } from "react";

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (search: string) => void;
}
const defaultContextValue: SearchContextType = {
  searchTerm: "",
  setSearchTerm: () => {},
};

export const SearchQueryContext =
  createContext<SearchContextType>(defaultContextValue);

const SearchQueryContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <SearchQueryContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchQueryContext.Provider>
  );
};

export default SearchQueryContextProvider;

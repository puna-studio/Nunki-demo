import { useState, createContext } from "react";

export const MovieProvider = ({ children }: any) => {
  const [state, setState] = useState({
    movie: null,
    searchText: "",
    filter: {
      type: "popularity",
      order: "desc",
    },
    selection: false,
  });

  return (
    <MovieContext.Provider value={[state, setState]}>
      {children}
    </MovieContext.Provider>
  );
};

export const MovieContext: any = createContext({});

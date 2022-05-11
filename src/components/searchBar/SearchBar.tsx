import { useContext } from "react";
import "./searchBar.scss";
import { MovieContext } from "../../context/movieProvider";

export const SearchBar = () => {
  const [state, setState] = useContext(MovieContext);

  return (
    <div className="searchbar-wrapper">
      <input
        type="text"
        placeholder="Search movies..."
        value={state.searchText}
        onChange={(e) => {
          const value = e.target.value;
          setState({ ...state, searchText: value });
        }}
      />
      <div className="icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <path
            fill="#231f20"
            d="M13.85,13.15l-2.68-2.69a5.14,5.14,0,0,0,1.2-3.28,5.19,5.19,0,1,0-5.19,5.19,5.14,5.14,0,0,0,3.28-1.2l2.69,2.68a.48.48,0,0,0,.7,0A.48.48,0,0,0,13.85,13.15ZM3,7.18a4.19,4.19,0,1,1,4.18,4.19A4.19,4.19,0,0,1,3,7.18Z"
            data-name="Layer 2"
          />
        </svg>
      </div>
    </div>
  );
};

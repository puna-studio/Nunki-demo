import { useContext } from "react";
import { MovieContext } from "../../context/movieProvider";
import "./filter.scss";

export const Filter = () => {
  const [state, setState] = useContext(MovieContext);

  function filterBy(filter: string) {
    if (state.filter.type === filter) {
      if (state.filter.order === "asc") {
        setState({ ...state, filter: { type: filter, order: "desc" } });
      } else {
        setState({ ...state, filter: { type: filter, order: "asc" } });
      }
    } else {
      setState({ ...state, filter: { type: filter, order: "desc" } });
    }
  }

  return (
    <ul className="filter">
      <li
        className={state.filter.type === "popularity" ? "active" : ""}
        onClick={() => {
          filterBy("popularity");
        }}
      >
        <p>Popularity</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Layer_1"
          x="0"
          y="0"
          version="1.1"
          viewBox="0 0 29 29"
          className={state.filter.order === "asc" ? "asc" : ""}
        >
          <path fill="none" d="M20.5 11.5l-6 6-6-6" />
        </svg>
      </li>
      <li
        className={state.filter.type === "release_date" ? "active" : ""}
        onClick={() => {
          filterBy("release_date");
        }}
      >
        <p>Release date</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Layer_1"
          x="0"
          y="0"
          version="1.1"
          viewBox="0 0 29 29"
          className={state.filter.order === "asc" ? "asc" : ""}
        >
          <path fill="none" d="M20.5 11.5l-6 6-6-6" />
        </svg>
      </li>
      <li
        className={state.filter.type === "vote_count" ? "active" : ""}
        onClick={() => {
          filterBy("vote_count");
        }}
      >
        <p>Vote</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Layer_1"
          x="0"
          y="0"
          version="1.1"
          viewBox="0 0 29 29"
          className={state.filter.order === "asc" ? "asc" : ""}
        >
          <path fill="none" d="M20.5 11.5l-6 6-6-6" />
        </svg>
      </li>
    </ul>
  );
};

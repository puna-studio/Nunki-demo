import { useContext } from "react";
import { Filter } from "../filter/Filter";
import { MovieContext } from "../../context/movieProvider";
import { useInfiniteQuery } from "react-query";
import "./grid.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDebounce } from "../../hooks/useDebouce";
import placeholder from "../../assets/placeholder-poster.jpg";

export const Grid = () => {
  const [state, setState] = useContext(MovieContext);

  const apiKey = process.env.REACT_APP_API_KEY;
  const endpoint = process.env.REACT_APP_API_ENDPOINT;

  const debouncedText = useDebounce(state.searchText, 300);

  function get(searchText: string, pageParam: number, filter: any) {
    if (searchText) {
      return fetch(
        endpoint! +
          "search/movie?api_key=" +
          apiKey +
          "&query=" +
          searchText +
          "&page=" +
          pageParam +
          "&sort_by=" +
          filter.type +
          "." +
          filter.order
      ).then((res) => res.json());
    } else {
      return fetch(
        endpoint! +
          "discover/movie?api_key=" +
          apiKey +
          "&page=" +
          pageParam +
          "&sort_by=" +
          filter.type +
          "." +
          filter.order
      ).then((res) => res.json());
    }
  }

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ["movies", state.filter, debouncedText],
    ({ pageParam = 1 }) => get(debouncedText, pageParam, state.filter),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.page === lastPage.total_pages) return false;
        return lastPage.page + 1;
      },
    }
  );

  const movies =
    data?.pages.reduce(
      (prevMovies, page) => prevMovies.concat(page.results),
      []
    ) ?? [];

  return (
    <div className="grid-wrapper">
      <div className="grid-header">
        <div>
          {!state.searchText && <h2>Discover</h2>}
          {state.searchText && <h2>Searching for: {debouncedText}</h2>}
          {state.searchText && (
            <h2 className="grid-total">
              Total results: {data?.pages[0].total_results}
            </h2>
          )}
        </div>
        <Filter></Filter>
      </div>

      <InfiniteScroll
        dataLength={movies.length}
        hasMore={hasNextPage || isLoading}
        next={() => fetchNextPage()}
        loader={<span></span>}
      >
        <ol>
          {movies.map((movie: any) => (
            <li key={movie.id}>
              <div
                className="favorite"
                onClick={() => {
                  setState({ ...state, selection: true });
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                >
                  <path d="M 4.9960938,2.0039062 C 3.9802089,1.9505853 2.9614454,2.2897237 2.2109375,3.0410156 0.70954307,4.544026 0.86729496,7.0683685 2.4726562,8.6757812 l 0.5136719,0.5136719 4.6621094,4.6660159 c 0.1950388,0.193887 0.5100393,0.193887 0.7050781,0 L 13.013672,9.1894531 13.527344,8.6757812 C 15.132778,7.0683685 15.2885,4.544026 13.787109,3.0410156 12.285787,1.5381119 9.76725,1.697808 8.1621094,3.3046875 L 8,3.4667969 7.8378906,3.3046875 C 7.0354005,2.5012477 6.0125131,2.057867 4.9960938,2.0039062 Z" />
                </svg>
              </div>
              <img
                onClick={() => {
                  setState({ ...state, movie: movie.id });
                }}
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
                    : placeholder
                }
                alt={`${movie.title}`}
              />
              <h2 className="movieName">{movie.title}</h2>
            </li>
          ))}
        </ol>
      </InfiniteScroll>
    </div>
  );
};

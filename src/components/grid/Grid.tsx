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
    ["movies", debouncedText, state.filter],
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
            <li
              key={movie.id}
              onClick={() => {
                setState({ ...state, movie: movie.id });
              }}
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
                    : placeholder
                }
                alt={`${movie.title}`}
              />
            </li>
          ))}
        </ol>
      </InfiniteScroll>
    </div>
  );
};

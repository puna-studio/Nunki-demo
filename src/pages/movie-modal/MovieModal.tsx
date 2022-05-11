import { useContext } from "react";
import { useQuery } from "react-query";
import { MovieContext } from "../../context/movieProvider";
import "./movieModal.scss";
import placeholder from "../../assets/placeholder.jpg";

export const MovieModal = () => {
  // const [movie, setMovie] = useContext(MovieContext);
  const [state, setState] = useContext(MovieContext);

  const apiKey = process.env.REACT_APP_API_KEY;
  const endpoint = process.env.REACT_APP_API_ENDPOINT;
  const { data: movieData, isLoading } = useQuery(["movie", state.movie], () =>
    get()
  );

  function get() {
    return fetch(
      endpoint! + "movie/" + state.movie + "?api_key=" + apiKey
    ).then((res) => res.json());
  }
  console.log(movieData);

  if (!isLoading)
    return (
      <div className="modal-wrapper">
        <div
          className="modal-backdrop"
          onClick={() => {
            setState({ ...state, movie: null });
          }}
        ></div>
        <div className="modal">
          <img
            src={
              movieData.backdrop_path
                ? `https://image.tmdb.org/t/p/w1280/${movieData.backdrop_path}`
                : placeholder
            }
            alt={movieData.title}
          />
          <div className="modal-data">
            <p className="modal-title">{movieData.title}</p>
            <p className="modal-overview">{movieData.overview}</p>
            <p className="sm">Genre: {movieData.genres[0].name}</p>
            <p className="sm">Duration: {movieData.runtime} min</p>
            <div className="votes">
              <p className="sm">{movieData.vote_average} / 10</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                baseProfile="tiny"
                version="1.2"
                viewBox="0 0 24 24"
              >
                <path d="M3.1 11.3l3.6 3.3-1 4.6c-.1.6.1 1.2.6 1.5.2.2.5.3.8.3.2 0 .4 0 .6-.1 0 0 .1 0 .1-.1l4.1-2.3 4.1 2.3s.1 0 .1.1c.5.2 1.1.2 1.5-.1.5-.3.7-.9.6-1.5l-1-4.6c.4-.3 1-.9 1.6-1.5l1.9-1.7.1-.1c.4-.4.5-1 .3-1.5s-.6-.9-1.2-1h-.1l-4.7-.5-1.9-4.3s0-.1-.1-.1c-.1-.7-.6-1-1.1-1-.5 0-1 .3-1.3.8 0 0 0 .1-.1.1L8.7 8.2 4 8.7h-.1c-.5.1-1 .5-1.2 1-.1.6 0 1.2.4 1.6z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  else {
    return null;
  }
};

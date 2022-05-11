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
          </div>
        </div>
      </div>
    );
  else {
    return null;
  }
};

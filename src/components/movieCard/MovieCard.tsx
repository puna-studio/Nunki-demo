import { useContext } from "react";
import { MovieContext } from "../../context/movieProvider";
import placeholder from "../../assets/placeholder-poster.jpg";
import "./movieCard.scss";

export const MovieCard = ({ movie }: any) => {
  const [state, setState] = useContext(MovieContext);

  return (
    <div className="card">
      <div
        className="favorite"
        onClick={() => {
          setState({ ...state, selection: true, movie: movie });
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
          setState({ ...state, movie: movie });
        }}
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
            : placeholder
        }
        alt={`${movie.title}`}
      />
      <h2 className="movieName">{movie.title}</h2>
    </div>
  );
};

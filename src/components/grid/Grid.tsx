import { MovieCard } from "../movie-card/MovieCard";
import "./grid.scss";

export const Grid = ({ movies }: any) => {
  return (
    <div className="grid-wrapper">
      <ol>
        {movies.map((movie: any) => (
          <li key={movie.id}>
            Title: {movie.title}, id: {movie.id}
            <img
              src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
              alt={`${movie.title}`}
            />
          </li>
        ))}
      </ol>
    </div>
  );
};

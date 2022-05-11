import { MovieCard } from "../movie-card/MovieCard";
import "./grid.scss";

export const Grid = ({ movies }: any) => {
  return (
    <div className="grid-wrapper">
      <ol>
        {movies.map((movie: any) => (
          <li key={movie.id}>
            {/* Title: {movie.title} */} {/* id: {movie.id} */}
            <div className="img-wrapper">
              <img
                src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                alt={`${movie.title}`}
              />
              <div className="movie-data">
                <p className="name">{movie.title}</p>
                <p className="description">{movie.overview}</p>
                <div className="votes">
                  <p>Votes: {movie.vote_average}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" />
                  </svg>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

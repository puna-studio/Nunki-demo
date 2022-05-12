import "./selections.scss";
import { Navbar } from "../../components/navbar/Navbar";
import { MovieCard } from "../../components/movieCard/MovieCard";
import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../../context/movieProvider";
import { MovieModal } from "../movie-modal/MovieModal";
import { PlaylistModal } from "../playlist-modal/PlaylistModal";

export const Selections = () => {
  const [state, setState] = useContext(MovieContext);

  const [selections, setSelections]: any = useState([]);

  function getPlaylists() {
    const playlists: Array<any> = JSON.parse(
      localStorage.getItem("playlists")!
    );

    if (playlists !== null) {
      setSelections(playlists);
    }
  }

  useEffect(() => {
    getPlaylists();
  }, [state]);

  return (
    <div className="selections-wrapper">
      <Navbar />
      {selections.map((selection: any) => (
        <div className="selection">
          <h2 className="selection-title">{selection.name}</h2>
          <ol className="grid">
            {selection.movies.map((movie: any) => (
              <li>
                <MovieCard movie={movie} />
              </li>
            ))}
          </ol>
        </div>
      ))}
      {state.movie && !state.selection && <MovieModal />}
      {state.selection && <PlaylistModal />}
    </div>
  );
};

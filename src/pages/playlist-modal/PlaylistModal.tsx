import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../../context/movieProvider";
import "./playlistModal.scss";

export const PlaylistModal = () => {
  const [state, setState] = useContext(MovieContext);
  const [selections, setSelections]: any = useState([]);
  const [selectionName, setSelectionName]: any = useState("");

  function getPlaylists() {
    const playlists: Array<any> = JSON.parse(
      localStorage.getItem("playlists")!
    );

    if (playlists !== null) {
      for (let playlist of playlists) {
        playlist.favourited = false;
        for (let movie of playlist.movies) {
          if (movie.id === state.movie.id) {
            playlist.favourited = true;
            break;
          }
        }
      }

      setSelections(playlists);
    }
  }

  useEffect(() => {
    getPlaylists();
  }, []);

  function createPlaylist(name: string) {
    let playlists: Array<any> = JSON.parse(localStorage.getItem("playlists")!);

    if (playlists !== null) {
      let nameValid: boolean = true;

      for (let i = 0; i < playlists.length; i++) {
        if (playlists[i].name === name) {
          nameValid = false;
          break;
        }
      }

      if (nameValid) {
        const playlist = {
          name: name,
          movies: [],
        };

        playlists.push(playlist);
        localStorage.setItem("playlists", JSON.stringify(playlists));
        setSelectionName("");
      }
    } else {
      playlists = [];
      const playlist = {
        name: name,
        movies: [],
      };
      playlists.push(playlist);
      localStorage.setItem("playlists", JSON.stringify(playlists));
      setSelectionName("");
    }
    getPlaylists();
  }

  function addMovieToPlaylist(playlist: string, movie: any) {
    const playlists: Array<any> = JSON.parse(
      localStorage.getItem("playlists")!
    );

    if (playlists !== null) {
      for (let i = 0; i < playlists.length; i++) {
        if (playlists[i].name === playlist) {
          if (playlists[i].movies.indexOf(movie) === -1) {
            playlists[i].movies.push(movie);
            localStorage.setItem("playlists", JSON.stringify(playlists));
            getPlaylists();
            break;
          }
        }
      }
    }
  }

  function removeMovieFromPlaylist(playlist: string, movie: any) {
    const playlists: Array<any> = JSON.parse(
      localStorage.getItem("playlists")!
    );

    if (playlists !== null) {
      for (let i = 0; i < playlists.length; i++) {
        if (playlists[i].name === playlist) {
          for (let x = 0; x < playlists[i].movies.length; x++) {
            if (playlists[i].movies[x].id === movie.id) {
              playlists[i].movies.splice(x, 1);
              localStorage.setItem("playlists", JSON.stringify(playlists));
              getPlaylists();
              break;
            }
          }
        }
      }
    }
  }

  return (
    <div className="modal-wrapper">
      <div
        className="modal-backdrop"
        onClick={() => {
          setState({ ...state, selection: false, movie: null });
        }}
      ></div>

      <div className="selection-modal">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Selection name"
            value={selectionName}
            onChange={(e) => {
              const value = e.target.value;
              setSelectionName(value);
            }}
          />
          <div
            className="add-wrapper"
            onClick={() => {
              createPlaylist(selectionName);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path fill="none" d="M0 0h24v24H0V0z" />
              <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z" />
            </svg>
          </div>
        </div>
        <ul className="selection-list">
          {selections.map((playlist: any) => (
            <li
              key={playlist.name}
              className={playlist.favourited ? "favourited" : ""}
            >
              <p>{playlist.name}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                onClick={() => {
                  if (playlist.favourited)
                    removeMovieFromPlaylist(playlist.name, state.movie);
                  else addMovieToPlaylist(playlist.name, state.movie);
                }}
              >
                <path d="M 4.9960938,2.0039062 C 3.9802089,1.9505853 2.9614454,2.2897237 2.2109375,3.0410156 0.70954307,4.544026 0.86729496,7.0683685 2.4726562,8.6757812 l 0.5136719,0.5136719 4.6621094,4.6660159 c 0.1950388,0.193887 0.5100393,0.193887 0.7050781,0 L 13.013672,9.1894531 13.527344,8.6757812 C 15.132778,7.0683685 15.2885,4.544026 13.787109,3.0410156 12.285787,1.5381119 9.76725,1.697808 8.1621094,3.3046875 L 8,3.4667969 7.8378906,3.3046875 C 7.0354005,2.5012477 6.0125131,2.057867 4.9960938,2.0039062 Z" />
              </svg>
            </li>
          ))}
        </ul>

        <button
          onClick={() => {
            setState({ ...state, selection: false, movie: null });
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

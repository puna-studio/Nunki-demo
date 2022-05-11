import { useContext, useState } from "react";
import { MovieContext } from "../../context/movieProvider";
import "./playlistModal.scss";

export const PlaylistModal = () => {
  const [state, setState] = useContext(MovieContext);

  function getPlaylists() {
    const playlists: Array<any> = JSON.parse(localStorage.getItem("playlists")!);
    console.log(playlists);
  }
  
  function createPlaylist(name: string) {
    let playlists: Array<any> = JSON.parse(localStorage.getItem("playlists")!);
    console.log(playlists);
    
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
          movies: []
        };
        
        playlists.push(playlist);
        localStorage.setItem("playlists", JSON.stringify(playlists));
      }
    } else {
      playlists = [];
      const playlist = {
        name: name,
        movies: []
      };
      playlists.push(playlist);
      localStorage.setItem("playlists", JSON.stringify(playlists));
    }
    
    function addMovieToPlaylist(playlist: string, movie: any) {
      const playlists: Array<any> = JSON.parse(localStorage.getItem("playlists")!);
      
      if (playlists !== null) {
        for (let i = 0; i < playlists.length; i++) {
          if (playlists[i].name === playlist) {
            if (playlists[i].movies.indexOf(movie) === -1) {
              playlists[i].movies.push(movie);
              localStorage.setItem("playlists", JSON.stringify(playlists));
              break;
            } 
          }
        }
      }
    }
    
    function removeMovieToPlaylist(playlist: string, movie: any) {
      const playlists: Array<any> = JSON.parse(localStorage.getItem("playlists")!);
      console.log('4');
      
      if (playlists !== null) {
        for (let i = 0; i < playlists.length; i++) {
          if (playlists[i].name === playlist) {
            if (playlists[i].movies.indexOf(movie) !== -1) {
              const index = playlists[i].movies.indexOf(movie);
              playlists.splice(index, 1);
              localStorage.setItem("playlists", JSON.stringify(playlists));
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
          setState({ ...state, selection: false });
        }}
      ></div>

      <div className="selection-modal">
        <div className="input-wrapper">
          <input type="text" placeholder="Selection name" />
          <div
          className="add-wrapper"
          onClick={() => {
            createPlaylist("prueba2");
          }}>
            
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

        <button>Close</button>
      </div>
    </div>
  );
};
